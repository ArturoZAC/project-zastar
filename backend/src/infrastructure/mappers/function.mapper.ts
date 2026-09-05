import { Function } from "../../domain/entities/function.entity";
import { functions } from "../database/schema/function.schema";

type DbRow = typeof functions.$inferSelect;

export const toFunctionEntity = (row: DbRow): Function => ({
  id: row.id,
  movieId: row.movieId,
  roomId: row.roomId,
  format: row.format as Function["format"],
  language: row.language as Function["language"],
  startTime: row.startTime,
  basePrice: Number(row.basePrice),
  vipSurcharge: Number(row.vipSurcharge),
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
  deletedAt: row.deletedAt ?? undefined,
});
