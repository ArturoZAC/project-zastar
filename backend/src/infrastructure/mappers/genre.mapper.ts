import { Genre } from "../../domain/entities/genre.entity";
import { genres } from "../database/schema/genre.schema";

type DbRow = typeof genres.$inferSelect;

export const toGenreEntity = (row: DbRow): Genre => ({
  id: row.id,
  name: row.name,
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
  deletedAt: row.deletedAt ?? undefined,
});
