import { PaymentRepository } from "../../../domain/repositories/payment.repository";
import { ReservationRepository } from "../../../domain/repositories/reservation.repository";
import { getPaymentGateway } from "../../../infrastructure/gateways/gateway.factory";
import { BadRequestError } from "../../../shared/errors/bad-request-error";
import { NotFoundError } from "../../../shared/errors/not-found-error";

interface ConfirmPaymentInput {
  reservationId: string;
  sourceId: string; // Token from frontend (tkn_xxx for Culqi, formToken for Izipay)
}

export class ConfirmPaymentUseCase {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    private readonly paymentRepo: PaymentRepository,
  ) {}

  async execute(input: ConfirmPaymentInput) {
    // 1. Find reservation
    const reservation = await this.reservationRepo.findById(input.reservationId);
    if (!reservation) {
      throw new NotFoundError("Reservation not found");
    }

    if (reservation.status !== "pending") {
      throw new BadRequestError("Reservation is not pending");
    }

    if (!reservation.guestEmail) {
      throw new BadRequestError("Reservation has no guest email");
    }

    // 2. Create payment record
    const payment = await this.paymentRepo.create({
      reservationId: reservation.id,
      provider: "culqi",
      amount: reservation.totalPrice,
      status: "pending",
    });

    // 3. Process payment via gateway
    const gateway = getPaymentGateway();

    try {
      const result = await gateway.createPayment({
        amount: reservation.totalPrice,
        email: reservation.guestEmail,
        description: `ZASTAR - Reservation ${reservation.ticketCode}`,
        sourceId: input.sourceId,
      });

      // 4. Update payment status
      await this.paymentRepo.update(payment.id, {
        providerPaymentId: result.providerPaymentId,
        status: result.status === "completed" ? "completed" : "pending",
      });

      // 5. Update reservation status if payment completed
      if (result.status === "completed") {
        await this.reservationRepo.update(reservation.id, {
          status: "confirmed",
        });
      }

      return {
        reservationId: reservation.id,
        ticketCode: reservation.ticketCode,
        paymentStatus: result.status,
        formToken: result.formToken,
      };
    } catch (error) {
      // Mark payment as failed
      await this.paymentRepo.update(payment.id, {
        status: "failed",
      });

      throw error;
    }
  }
}
