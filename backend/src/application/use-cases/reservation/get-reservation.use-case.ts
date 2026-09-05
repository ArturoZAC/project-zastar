import { Reservation } from "../../../domain/entities/reservation.entity";
import { ReservationSeat } from "../../../domain/entities/reservation-seat.entity";
import { ReservationRepository } from "../../../domain/repositories/reservation.repository";
import { ReservationSeatRepository } from "../../../domain/repositories/reservation-seat.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

interface ReservationWithSeats extends Reservation {
  seats: ReservationSeat[];
}

export interface GetReservationUseCase {
  execute(id: string): Promise<ReservationWithSeats>;
  executeByTicketCode(ticketCode: string): Promise<ReservationWithSeats>;
  executeAll(filters?: Record<string, string>): Promise<Reservation[]>;
}

export class GetReservation implements GetReservationUseCase {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    private readonly reservationSeatRepo: ReservationSeatRepository,
  ) {}

  execute = async (id: string): Promise<ReservationWithSeats> => {
    const reservation = await this.reservationRepo.findById(id);
    if (!reservation) throw new NotFoundError("Reservation not found");
    const seats = await this.reservationSeatRepo.findByReservationId(id);
    return { ...reservation, seats };
  };

  executeByTicketCode = async (ticketCode: string): Promise<ReservationWithSeats> => {
    const reservation = await this.reservationRepo.findByTicketCode(ticketCode);
    if (!reservation) throw new NotFoundError("Reservation not found");
    const seats = await this.reservationSeatRepo.findByReservationId(reservation.id);
    return { ...reservation, seats };
  };

  executeAll = async (filters?: Record<string, string>): Promise<Reservation[]> => {
    return this.reservationRepo.findAll(filters);
  };
}
