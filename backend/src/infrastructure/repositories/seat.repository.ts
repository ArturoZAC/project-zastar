import { eq } from "drizzle-orm";

import { SeatRepository } from "../../domain/repositories/seat.repository";
import { CreateSeatInput } from "../../shared/schemas/seat.schema";
import { db } from "../database/connection";
import { seats } from "../database/schema/seat.schema";
import { toSeatEntity } from "../mappers/seat.mapper";

export class SeatRepositoryImpl extends SeatRepository {
  async findById(id: string) {
    const [row] = await db.select().from(seats).where(eq(seats.id, id));
    return row ? toSeatEntity(row) : null;
  }

  async findByRoomId(roomId: string) {
    const rows = await db.select().from(seats).where(eq(seats.roomId, roomId));
    return rows.map(toSeatEntity);
  }

  async createMany(data: CreateSeatInput[]) {
    const rows = await db.insert(seats).values(data).returning();
    return rows.map(toSeatEntity);
  }

  async deleteByRoomId(roomId: string) {
    await db.delete(seats).where(eq(seats.roomId, roomId));
  }
}
