import { Movie } from "../../../domain/entities/movie.entity";
import { MovieRepository } from "../../../domain/repositories/movie.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { UpdateMovieInput } from "../../../shared/schemas/movie.schema";

export interface UpdateMovieUseCase {
  execute(id: string, data: UpdateMovieInput): Promise<Movie>;
}

export class UpdateMovie implements UpdateMovieUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  execute = async (id: string, data: UpdateMovieInput): Promise<Movie> => {
    const existing = await this.movieRepo.findById(id);
    if (!existing) throw new NotFoundError("Movie not found");
    return this.movieRepo.update(id, data);
  };
}
