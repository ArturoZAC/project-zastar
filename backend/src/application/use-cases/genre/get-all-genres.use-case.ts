import { GenreRepository } from "../../../domain/repositories/genre.repository";

export class GetAllGenresUseCase {
  constructor(private readonly genreRepo: GenreRepository) {}

  async execute() {
    const genres = await this.genreRepo.findAll();
    return genres;
  }
}
