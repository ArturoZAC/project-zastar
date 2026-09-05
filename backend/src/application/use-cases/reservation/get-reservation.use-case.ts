import { ReservationRepository } from "../../../domain/repositories/reservation.repository";
import { ReservationSeatRepository } from "../../../domain/repositories/reservation-seat.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { ReservationFilters } from "../../../shared/schemas/reservation.schema";

export class GetReservationUseCase {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    private readonly reservationSeatRepo: ReservationSeatRepository,
  ) {}

  async execute(id: string) {
    const reservation = await this.reservationRepo.findById(id);
    if (!reservation) {
      throw new NotFoundError("Reservation not found");
    }

    const seats = await this.reservationSeatRepo.findByReservationId(id);

    return {
      ...reservation,
      seats,
    };
  }

  async executeByTicketCode(ticketCode: string) {
    const reservation = await this.reservationRepo.findByTicketCode(ticketCode);
    if (!reservation) {
      throw new NotFoundError("Reservation not found");
    }

    const seats = await this.reservationSeatRepo.findByReservationId(reservation.id);

    return {
      ...reservation,
      seats,
    };
  }

  async executeAll(filters?: ReservationFilters) {
    const reservations = await this.reservationRepo.findAll(filters);
    return reservations;
  }
}
