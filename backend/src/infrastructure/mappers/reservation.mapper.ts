import { Reservation } from "../../domain/entities/reservation.entity";
import { reservations } from "../database/schema/reservation.schema";

type DbRow = typeof reservations.$inferSelect;

export const toReservationEntity = (row: DbRow): Reservation => ({
  id: row.id,
  functionId: row.functionId,
  guestEmail: row.guestEmail ?? undefined,
  guestName: row.guestName ?? undefined,
  guestPhone: row.guestPhone ?? undefined,
  ticketCode: row.ticketCode,
  totalPrice: Number(row.totalPrice),
  status: row.status as Reservation["status"],
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
  expiresAt: row.expiresAt ?? undefined,
});
