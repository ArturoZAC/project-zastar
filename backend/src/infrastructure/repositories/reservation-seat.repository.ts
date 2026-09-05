import { eq } from "drizzle-orm";

import { ReservationSeatRepository } from "../../domain/repositories/reservation-seat.repository";
import { CreateReservationSeatInput } from "../../shared/schemas/reservation-seat.schema";
import { db } from "../database/connection";
import { reservationSeats } from "../database/schema/reservation-seat.schema";
import { toReservationSeatEntity } from "../mappers/reservation-seat.mapper";

export class ReservationSeatRepositoryImpl extends ReservationSeatRepository {
  async findByReservationId(reservationId: string) {
    const rows = await db
      .select()
      .from(reservationSeats)
      .where(eq(reservationSeats.reservationId, reservationId));
    return rows.map(toReservationSeatEntity);
  }

  async createMany(data: CreateReservationSeatInput[]) {
    const dbData = data.map((d) => ({ ...d, price: String(d.price) }));
    const rows = await db.insert(reservationSeats).values(dbData).returning();
    return rows.map(toReservationSeatEntity);
  }

  async deleteByReservationId(reservationId: string) {
    await db.delete(reservationSeats).where(eq(reservationSeats.reservationId, reservationId));
  }
}
