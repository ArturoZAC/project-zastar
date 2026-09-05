import { Seat } from "../../domain/entities/seat.entity";
import { seats } from "../database/schema/seat.schema";

type DbRow = typeof seats.$inferSelect;

export const toSeatEntity = (row: DbRow): Seat => ({
  id: row.id,
  roomId: row.roomId,
  row: row.row,
  number: row.number,
  tier: row.tier as Seat["tier"],
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});
