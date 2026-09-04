import { CreateReservationSeatInput } from "../../shared/schemas/reservation-seat.schema";
import { ReservationSeat } from "../entities/reservation-seat.entity";

export abstract class ReservationSeatRepository {
  abstract findByReservationId(reservationId: string): Promise<ReservationSeat[]>;
  abstract createMany(data: CreateReservationSeatInput[]): Promise<ReservationSeat[]>;
  abstract deleteByReservationId(reservationId: string): Promise<void>;
}
