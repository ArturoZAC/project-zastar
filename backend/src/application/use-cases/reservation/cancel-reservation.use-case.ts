import { ReservationRepository } from "../../../domain/repositories/reservation.repository";
import { ReservationSeatRepository } from "../../../domain/repositories/reservation-seat.repository";
import { releaseSeatLock } from "../../../infrastructure/cache/redis";
import { BadRequestError } from "../../../shared/errors/bad-request-error";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export interface CancelReservationUseCase {
  execute(id: string): Promise<void>;
}

export class CancelReservation implements CancelReservationUseCase {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    private readonly reservationSeatRepo: ReservationSeatRepository,
  ) {}

  execute = async (id: string): Promise<void> => {
    const reservation = await this.reservationRepo.findById(id);
    if (!reservation) throw new NotFoundError("Reservation not found");
    if (reservation.status === "cancelled")
      throw new BadRequestError("Reservation is already cancelled");
    if (reservation.status === "confirmed")
      throw new BadRequestError("Cannot cancel a confirmed reservation");

    const seats = await this.reservationSeatRepo.findByReservationId(id);
    await Promise.all(seats.map((s) => releaseSeatLock(reservation.functionId, s.seatId)));
    await this.reservationRepo.update(id, { status: "cancelled" });
    await this.reservationSeatRepo.deleteByReservationId(id);
  };
}
