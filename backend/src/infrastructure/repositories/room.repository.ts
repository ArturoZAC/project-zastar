import { and, eq } from "drizzle-orm";

import { RoomRepository } from "../../domain/repositories/room.repository";
import { CreateRoomInput, RoomFilters, UpdateRoomInput } from "../../shared/schemas/room.schema";
import { db } from "../database/connection";
import { rooms } from "../database/schema/room.schema";
import { toRoomEntity } from "../mappers/room.mapper";

export class RoomRepositoryImpl extends RoomRepository {
  async findById(id: string) {
    const [row] = await db.select().from(rooms).where(eq(rooms.id, id));
    return row ? toRoomEntity(row) : null;
  }

  async findByName(name: string) {
    const [row] = await db.select().from(rooms).where(eq(rooms.name, name));
    return row ? toRoomEntity(row) : null;
  }

  async findAll(filters?: RoomFilters) {
    const conditions = [];

    if (filters?.isActive !== undefined) {
      conditions.push(eq(rooms.isActive, filters.isActive));
    }
    if (filters?.format) {
      conditions.push(eq(rooms.format, filters.format));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = await db.select().from(rooms).where(where);
    return rows.map(toRoomEntity);
  }

  async create(data: CreateRoomInput) {
    const [row] = await db.insert(rooms).values(data).returning();
    return toRoomEntity(row);
  }

  async update(id: string, data: UpdateRoomInput) {
    const [row] = await db
      .update(rooms)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(rooms.id, id))
      .returning();
    return toRoomEntity(row);
  }

  async softDelete(id: string) {
    await db.update(rooms).set({ deletedAt: new Date() }).where(eq(rooms.id, id));
  }
}
