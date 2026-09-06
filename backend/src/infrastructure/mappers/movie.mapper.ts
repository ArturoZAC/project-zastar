import { Movie } from "../../domain/entities/movie.entity";
import { envs } from "../../shared/config/envs";
import { movies } from "../database/schema/movie.schema";

type DbRow = typeof movies.$inferSelect;

export const toMovieEntity = (row: DbRow): Movie => ({
  id: row.id,
  title: row.title,
  synopsis: row.synopsis ?? undefined,
  durationMinutes: row.durationMinutes,
  posterUrl: row.posterKey
    ? `${envs.R2_PUBLIC_URL.replace(/\/$/, "")}/${row.posterKey}`
    : undefined,
  trailerUrl: row.trailerUrl ?? undefined,
  ageRating: row.ageRating as Movie["ageRating"],
  language: row.language as Movie["language"],
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
  deletedAt: row.deletedAt ?? undefined,
});
