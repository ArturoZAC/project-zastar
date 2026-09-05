import { GenreRepository } from "../../../domain/repositories/genre.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export class DeleteGenreUseCase {
  constructor(private readonly genreRepo: GenreRepository) {}

  async execute(id: string) {
    const existing = await this.genreRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("Genre not found");
    }

    await this.genreRepo.delete(id);
  }
}
