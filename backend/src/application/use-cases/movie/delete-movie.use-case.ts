import { MovieRepository } from "../../../domain/repositories/movie.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export interface DeleteMovieUseCase {
  execute(id: string): Promise<void>;
}

export class DeleteMovie implements DeleteMovieUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  execute = async (id: string): Promise<void> => {
    const existing = await this.movieRepo.findById(id);
    if (!existing) throw new NotFoundError("Movie not found");
    await this.movieRepo.softDelete(id);
  };
}
