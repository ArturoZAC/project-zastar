import { Movie } from "../../domain/entities/movie.entity";
import { movies } from "../database/schema/movie.schema";

type DbRow = typeof movies.$inferSelect;

export const toMovieEntity = (row: DbRow): Movie => ({
  id: row.id,
  title: row.title,
  synopsis: row.synopsis ?? undefined,
  durationMinutes: row.durationMinutes,
  posterUrl: row.posterUrl ?? undefined,
  trailerUrl: row.trailerUrl ?? undefined,
  ageRating: row.ageRating as Movie["ageRating"],
  language: row.language as Movie["language"],
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
  deletedAt: row.deletedAt ?? undefined,
});
