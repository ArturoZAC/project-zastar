import { Movie } from "../../../domain/entities/movie.entity";
import { MovieRepository } from "../../../domain/repositories/movie.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { MovieFilters } from "../../../shared/schemas/movie.schema";

export interface GetAllMoviesUseCase {
  execute(filters?: MovieFilters): Promise<Movie[]>;
}

export class GetAllMovies implements GetAllMoviesUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  execute = async (filters?: MovieFilters): Promise<Movie[]> => {
    return this.movieRepo.findAll(filters);
  };
}

export interface GetMovieByIdUseCase {
  execute(id: string): Promise<Movie>;
}

export class GetMovieById implements GetMovieByIdUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  execute = async (id: string): Promise<Movie> => {
    const movie = await this.movieRepo.findById(id);
    if (!movie) throw new NotFoundError("Movie not found");
    return movie;
  };
}
