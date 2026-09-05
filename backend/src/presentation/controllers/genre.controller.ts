import { Request, Response } from "express";

import { CreateGenreUseCase } from "../../application/use-cases/genre/create-genre.use-case";
import { DeleteGenreUseCase } from "../../application/use-cases/genre/delete-genre.use-case";
import { GetAllGenresUseCase } from "../../application/use-cases/genre/get-all-genres.use-case";
import { GetGenreByIdUseCase } from "../../application/use-cases/genre/get-genre-by-id.use-case";
import { UpdateGenreUseCase } from "../../application/use-cases/genre/update-genre.use-case";
import { GenreRepositoryImpl } from "../../infrastructure/repositories/genre.repository";
import { ResponseHelper } from "../../shared/helpers/response";

const genreRepo = new GenreRepositoryImpl();

export class GenreController {
  static async create(req: Request, res: Response) {
    const useCase = new CreateGenreUseCase(genreRepo);
    const genre = await useCase.execute(req.body);
    res.status(201).json(ResponseHelper.created("Genre created", genre));
  }

  static async getAll(_req: Request, res: Response) {
    const useCase = new GetAllGenresUseCase(genreRepo);
    const genres = await useCase.execute();
    res.status(200).json(ResponseHelper.success("Genres retrieved", genres));
  }

  static async getById(req: Request, res: Response) {
    const useCase = new GetGenreByIdUseCase(genreRepo);
    const genre = await useCase.execute(req.params.id as string);
    res.status(200).json(ResponseHelper.success("Genre retrieved", genre));
  }

  static async update(req: Request, res: Response) {
    const useCase = new UpdateGenreUseCase(genreRepo);
    const genre = await useCase.execute(req.params.id as string, req.body);
    res.status(200).json(ResponseHelper.success("Genre updated", genre));
  }

  static async delete(req: Request, res: Response) {
    const useCase = new DeleteGenreUseCase(genreRepo);
    await useCase.execute(req.params.id as string);
    res.status(204).send();
  }
}
