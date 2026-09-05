import { Genre } from "../../../domain/entities/genre.entity";
import { GenreRepository } from "../../../domain/repositories/genre.repository";
import { ConflictError } from "../../../shared/errors/conflict-error";
import { CreateGenreInput } from "../../../shared/schemas/genre.schema";

export interface CreateGenreUseCase {
  execute(data: CreateGenreInput): Promise<Genre>;
}

export class CreateGenre implements CreateGenreUseCase {
  constructor(private readonly genreRepo: GenreRepository) {}

  execute = async (data: CreateGenreInput): Promise<Genre> => {
    const existing = await this.genreRepo.findByName(data.name);
    if (existing) throw new ConflictError("Genre name already exists");
    return this.genreRepo.create(data);
  };
}
