import { GenreRepository } from "../../../domain/repositories/genre.repository";
import { ConflictError } from "../../../shared/errors/conflict-error";
import { CreateGenreInput } from "../../../shared/schemas/genre.schema";

export class CreateGenreUseCase {
  constructor(private readonly genreRepo: GenreRepository) {}

  async execute(data: CreateGenreInput) {
    const existing = await this.genreRepo.findByName(data.name);
    if (existing) {
      throw new ConflictError("Genre name already exists");
    }

    const genre = await this.genreRepo.create(data);
    return genre;
  }
}
