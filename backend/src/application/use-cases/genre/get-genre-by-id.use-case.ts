import { Genre } from "../../../domain/entities/genre.entity";
import { GenreRepository } from "../../../domain/repositories/genre.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export interface GetGenreByIdUseCase {
  execute(id: string): Promise<Genre>;
}

export class GetGenreById implements GetGenreByIdUseCase {
  constructor(private readonly genreRepo: GenreRepository) {}

  execute = async (id: string): Promise<Genre> => {
    const genre = await this.genreRepo.findById(id);
    if (!genre) throw new NotFoundError("Genre not found");
    return genre;
  };
}
