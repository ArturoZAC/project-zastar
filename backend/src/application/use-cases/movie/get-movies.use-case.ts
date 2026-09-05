import { MovieRepository } from "../../../domain/repositories/movie.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { MovieFilters } from "../../../shared/schemas/movie.schema";

export class GetAllMoviesUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(filters?: MovieFilters) {
    const movies = await this.movieRepo.findAll(filters);
    return movies;
  }
}

export class GetMovieByIdUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(id: string) {
    const movie = await this.movieRepo.findById(id);
    if (!movie) {
      throw new NotFoundError("Movie not found");
    }
    return movie;
  }
}
