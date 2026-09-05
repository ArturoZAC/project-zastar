import { randomBytes } from "crypto";

import { FunctionRepository } from "../../../domain/repositories/function.repository";
import { PaymentRepository } from "../../../domain/repositories/payment.repository";
import { ReservationRepository } from "../../../domain/repositories/reservation.repository";
import { ReservationSeatRepository } from "../../../domain/repositories/reservation-seat.repository";
import { SeatRepository } from "../../../domain/repositories/seat.repository";
import { acquireSeatLock, releaseSeatLock } from "../../../infrastructure/cache/redis";
import { BadRequestError } from "../../../shared/errors/bad-request-error";
import { ConflictError } from "../../../shared/errors/conflict-error";
import { NotFoundError } from "../../../shared/errors/not-found-error";

interface CreateReservationInput {
  functionId: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  seatIds: string[];
}

export class CreateReservationUseCase {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    private readonly reservationSeatRepo: ReservationSeatRepository,
    private readonly functionRepo: FunctionRepository,
    private readonly seatRepo: SeatRepository,
    private readonly paymentRepo: PaymentRepository,
  ) {}

  async execute(input: CreateReservationInput) {
    // 1. Validate function exists
    const func = await this.functionRepo.findById(input.functionId);
    if (!func) {
      throw new NotFoundError("Function not found");
    }

    if (!func.isActive) {
      throw new BadRequestError("Function is not active");
    }

    // 2. Validate seats exist and belong to the function's room
    const seats = await Promise.all(input.seatIds.map(async (id) => this.seatRepo.findById(id)));

    const invalidSeats = seats.filter((s) => !s || s.roomId !== func.roomId);
    if (invalidSeats.length > 0) {
      throw new BadRequestError("One or more seats are invalid for this function");
    }

    // 3. Try to lock seats in Redis (5-minute TTL)
    const lockResults = await Promise.all(
      input.seatIds.map(async (seatId) => {
        const locked = await acquireSeatLock(input.functionId, seatId, "guest");
        return { seatId, locked };
      }),
    );

    const failedLocks = lockResults.filter((r) => !r.locked);
    if (failedLocks.length > 0) {
      // Release any successfully locked seats
      await Promise.all(
        lockResults.filter((r) => r.locked).map((r) => releaseSeatLock(input.functionId, r.seatId)),
      );

      throw new ConflictError(
        `Seats ${failedLocks.map((f) => f.seatId).join(", ")} are already locked by another user`,
      );
    }

    // 4. Calculate total price
    const validSeats = seats.filter(Boolean);
    const totalPrice = validSeats.reduce((sum, seat) => {
      const seatPrice =
        seat!.tier === "vip"
          ? Number(func.basePrice) + Number(func.vipSurcharge)
          : Number(func.basePrice);
      return sum + seatPrice;
    }, 0);

    // 5. Generate ticket code (ZST-XXXXXX)
    const ticketCode = `ZST-${randomBytes(3).toString("hex").toUpperCase()}`;

    // 6. Create reservation with PENDING status
    const reservation = await this.reservationRepo.create({
      functionId: input.functionId,
      guestName: input.guestName,
      guestEmail: input.guestEmail,
      guestPhone: input.guestPhone,
      ticketCode,
      totalPrice,
    });

    // 7. Create reservation seats
    const reservationSeatData = validSeats.map((seat) => ({
      reservationId: reservation.id,
      seatId: seat!.id,
      price:
        seat!.tier === "vip"
          ? Number(func.basePrice) + Number(func.vipSurcharge)
          : Number(func.basePrice),
    }));

    await this.reservationSeatRepo.createMany(reservationSeatData);

    return reservation;
  }
}
