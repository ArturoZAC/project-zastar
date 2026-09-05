import { Genre } from "../../../domain/entities/genre.entity";
import { GenreRepository } from "../../../domain/repositories/genre.repository";

export interface GetAllGenresUseCase {
  execute(): Promise<Genre[]>;
}

export class GetAllGenres implements GetAllGenresUseCase {
  constructor(private readonly genreRepo: GenreRepository) {}

  execute = async (): Promise<Genre[]> => {
    return this.genreRepo.findAll();
  };
}
