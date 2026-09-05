import { and, eq } from "drizzle-orm";

import {
  CreateReservationData,
  ReservationRepository,
} from "../../domain/repositories/reservation.repository";
import {
  ReservationFilters,
  UpdateReservationInput,
} from "../../shared/schemas/reservation.schema";
import { db } from "../database/connection";
import { reservations } from "../database/schema/reservation.schema";
import { toReservationEntity } from "../mappers/reservation.mapper";

export class ReservationRepositoryImpl extends ReservationRepository {
  async findById(id: string) {
    const [row] = await db.select().from(reservations).where(eq(reservations.id, id));
    return row ? toReservationEntity(row) : null;
  }

  async findByTicketCode(ticketCode: string) {
    const [row] = await db
      .select()
      .from(reservations)
      .where(eq(reservations.ticketCode, ticketCode));
    return row ? toReservationEntity(row) : null;
  }

  async findAll(filters?: ReservationFilters) {
    const conditions = [];

    if (filters?.status) {
      conditions.push(eq(reservations.status, filters.status));
    }
    if (filters?.guestEmail) {
      conditions.push(eq(reservations.guestEmail, filters.guestEmail));
    }
    if (filters?.functionId) {
      conditions.push(eq(reservations.functionId, filters.functionId));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = await db.select().from(reservations).where(where);
    return rows.map(toReservationEntity);
  }

  async create(data: CreateReservationData) {
    const dbData = {
      functionId: data.functionId,
      ticketCode: data.ticketCode,
      totalPrice: String(data.totalPrice),
      guestEmail: data.guestEmail,
      guestName: data.guestName,
      guestPhone: data.guestPhone,
      status: "pending" as const,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    };
    const [row] = await db.insert(reservations).values(dbData).returning();
    return toReservationEntity(row);
  }

  async update(id: string, data: UpdateReservationInput) {
    const dbData: Record<string, unknown> = { updatedAt: new Date() };
    if (data.status) dbData.status = data.status;
    if (data.expiresAt) dbData.expiresAt = new Date(data.expiresAt);
    const [row] = await db
      .update(reservations)
      .set(dbData)
      .where(eq(reservations.id, id))
      .returning();
    return toReservationEntity(row);
  }
}
