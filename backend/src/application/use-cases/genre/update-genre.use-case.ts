import { GenreRepository } from "../../../domain/repositories/genre.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { UpdateGenreInput } from "../../../shared/schemas/genre.schema";

export class UpdateGenreUseCase {
  constructor(private readonly genreRepo: GenreRepository) {}

  async execute(id: string, data: UpdateGenreInput) {
    const existing = await this.genreRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("Genre not found");
    }

    const genre = await this.genreRepo.update(id, data);
    return genre;
  }
}
