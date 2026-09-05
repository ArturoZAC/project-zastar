import { MovieRepository } from "../../../domain/repositories/movie.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { UpdateMovieInput } from "../../../shared/schemas/movie.schema";

export class UpdateMovieUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(id: string, data: UpdateMovieInput) {
    const existing = await this.movieRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("Movie not found");
    }

    const movie = await this.movieRepo.update(id, data);
    return movie;
  }
}
