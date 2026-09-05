import { GenreRepository } from "../../../domain/repositories/genre.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export class GetGenreByIdUseCase {
  constructor(private readonly genreRepo: GenreRepository) {}

  async execute(id: string) {
    const genre = await this.genreRepo.findById(id);
    if (!genre) {
      throw new NotFoundError("Genre not found");
    }
    return genre;
  }
}
