import { Room } from "../../domain/entities/room.entity";
import { rooms } from "../database/schema/room.schema";

type DbRow = typeof rooms.$inferSelect;

export const toRoomEntity = (row: DbRow): Room => ({
  id: row.id,
  name: row.name,
  format: row.format as Room["format"],
  totalSeats: row.totalSeats,
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
  deletedAt: row.deletedAt ?? undefined,
});
