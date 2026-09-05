import { ReservationSeat } from "../../domain/entities/reservation-seat.entity";
import { reservationSeats } from "../database/schema/reservation-seat.schema";

type DbRow = typeof reservationSeats.$inferSelect;

export const toReservationSeatEntity = (row: DbRow): ReservationSeat => ({
  reservationId: row.reservationId,
  seatId: row.seatId,
  price: Number(row.price),
  createdAt: row.createdAt,
});
