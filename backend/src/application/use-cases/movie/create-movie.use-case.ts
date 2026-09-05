import { MovieRepository } from "../../../domain/repositories/movie.repository";
import { CreateMovieInput } from "../../../shared/schemas/movie.schema";

export class CreateMovieUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(data: CreateMovieInput) {
    const movie = await this.movieRepo.create(data);
    return movie;
  }
}
