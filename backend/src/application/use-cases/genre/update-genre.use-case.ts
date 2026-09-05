import { Genre } from "../../../domain/entities/genre.entity";
import { GenreRepository } from "../../../domain/repositories/genre.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { UpdateGenreInput } from "../../../shared/schemas/genre.schema";

export interface UpdateGenreUseCase {
  execute(id: string, data: UpdateGenreInput): Promise<Genre>;
}

export class UpdateGenre implements UpdateGenreUseCase {
  constructor(private readonly genreRepo: GenreRepository) {}

  execute = async (id: string, data: UpdateGenreInput): Promise<Genre> => {
    const existing = await this.genreRepo.findById(id);
    if (!existing) throw new NotFoundError("Genre not found");
    return this.genreRepo.update(id, data);
  };
}
