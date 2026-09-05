import { GenreRepository } from "../../../domain/repositories/genre.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export interface DeleteGenreUseCase {
  execute(id: string): Promise<void>;
}

export class DeleteGenre implements DeleteGenreUseCase {
  constructor(private readonly genreRepo: GenreRepository) {}

  execute = async (id: string): Promise<void> => {
    const existing = await this.genreRepo.findById(id);
    if (!existing) throw new NotFoundError("Genre not found");
    await this.genreRepo.delete(id);
  };
}
