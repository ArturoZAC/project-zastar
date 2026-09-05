import { and, eq, ilike } from "drizzle-orm";

import { MovieRepository } from "../../domain/repositories/movie.repository";
import {
  CreateMovieInput,
  MovieFilters,
  UpdateMovieInput,
} from "../../shared/schemas/movie.schema";
import { db } from "../database/connection";
import { movies } from "../database/schema/movie.schema";
import { movieGenres } from "../database/schema/movie-genre.schema";
import { toMovieEntity } from "../mappers/movie.mapper";

export class MovieRepositoryImpl extends MovieRepository {
  async findById(id: string) {
    const [row] = await db.select().from(movies).where(eq(movies.id, id));
    return row ? toMovieEntity(row) : null;
  }

  async findAll(filters?: MovieFilters) {
    const conditions = [];

    if (filters?.isActive !== undefined) {
      conditions.push(eq(movies.isActive, filters.isActive));
    }
    if (filters?.title) {
      conditions.push(ilike(movies.title, `%${filters.title}%`));
    }
    if (filters?.ageRating) {
      conditions.push(eq(movies.ageRating, filters.ageRating));
    }
    if (filters?.language) {
      conditions.push(eq(movies.language, filters.language));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = await db.select().from(movies).where(where);
    return rows.map(toMovieEntity);
  }

  async create(data: CreateMovieInput) {
    const { genreIds, ...movieData } = data as CreateMovieInput & { genreIds?: string[] };
    const [row] = await db.insert(movies).values(movieData).returning();

    if (genreIds && genreIds.length > 0) {
      await db
        .insert(movieGenres)
        .values(genreIds.map((genreId) => ({ movieId: row.id, genreId })));
    }

    return toMovieEntity(row);
  }

  async update(id: string, data: UpdateMovieInput) {
    const { genreIds, ...movieData } = data as UpdateMovieInput & { genreIds?: string[] };
    const [row] = await db
      .update(movies)
      .set({ ...movieData, updatedAt: new Date() })
      .where(eq(movies.id, id))
      .returning();

    if (genreIds) {
      await db.delete(movieGenres).where(eq(movieGenres.movieId, id));
      if (genreIds.length > 0) {
        await db.insert(movieGenres).values(genreIds.map((genreId) => ({ movieId: id, genreId })));
      }
    }

    return toMovieEntity(row);
  }

  async softDelete(id: string) {
    await db.update(movies).set({ deletedAt: new Date() }).where(eq(movies.id, id));
  }
}
