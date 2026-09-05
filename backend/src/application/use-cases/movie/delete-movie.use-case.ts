import { MovieRepository } from "../../../domain/repositories/movie.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export class DeleteMovieUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(id: string) {
    const existing = await this.movieRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("Movie not found");
    }

    await this.movieRepo.softDelete(id);
  }
}
