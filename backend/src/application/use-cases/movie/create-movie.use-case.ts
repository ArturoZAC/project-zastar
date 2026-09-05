import { Movie } from "../../../domain/entities/movie.entity";
import { MovieRepository } from "../../../domain/repositories/movie.repository";
import { CreateMovieInput } from "../../../shared/schemas/movie.schema";

export interface CreateMovieUseCase {
  execute(data: CreateMovieInput): Promise<Movie>;
}

export class CreateMovie implements CreateMovieUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  execute = async (data: CreateMovieInput): Promise<Movie> => {
    return this.movieRepo.create(data);
  };
}
