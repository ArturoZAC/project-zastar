import { eq } from "drizzle-orm";

import { GenreRepository } from "../../domain/repositories/genre.repository";
import { CreateGenreInput, UpdateGenreInput } from "../../shared/schemas/genre.schema";
import { db } from "../database/connection";
import { genres } from "../database/schema/genre.schema";
import { toGenreEntity } from "../mappers/genre.mapper";

export class GenreRepositoryImpl extends GenreRepository {
  async findById(id: string) {
    const [row] = await db.select().from(genres).where(eq(genres.id, id));
    return row ? toGenreEntity(row) : null;
  }

  async findByName(name: string) {
    const [row] = await db.select().from(genres).where(eq(genres.name, name));
    return row ? toGenreEntity(row) : null;
  }

  async findAll() {
    const rows = await db.select().from(genres);
    return rows.map(toGenreEntity);
  }

  async create(data: CreateGenreInput) {
    const [row] = await db.insert(genres).values(data).returning();
    return toGenreEntity(row);
  }

  async update(id: string, data: UpdateGenreInput) {
    const [row] = await db
      .update(genres)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(genres.id, id))
      .returning();
    return toGenreEntity(row);
  }

  async delete(id: string) {
    await db.delete(genres).where(eq(genres.id, id));
  }
}
