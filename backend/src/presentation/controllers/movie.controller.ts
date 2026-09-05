import { Request, Response } from "express";

import { CreateMovieUseCase } from "../../application/use-cases/movie/create-movie.use-case";
import { DeleteMovieUseCase } from "../../application/use-cases/movie/delete-movie.use-case";
import {
  GetAllMoviesUseCase,
  GetMovieByIdUseCase,
} from "../../application/use-cases/movie/get-movies.use-case";
import { UpdateMovieUseCase } from "../../application/use-cases/movie/update-movie.use-case";
import { MovieRepositoryImpl } from "../../infrastructure/repositories/movie.repository";
import { ResponseHelper } from "../../shared/helpers/response";

const movieRepo = new MovieRepositoryImpl();

export class MovieController {
  static async create(req: Request, res: Response) {
    const useCase = new CreateMovieUseCase(movieRepo);
    const movie = await useCase.execute(req.body);
    res.status(201).json(ResponseHelper.created("Movie created", movie));
  }

  static async getAll(req: Request, res: Response) {
    const useCase = new GetAllMoviesUseCase(movieRepo);
    const movies = await useCase.execute(req.query);
    res.status(200).json(ResponseHelper.success("Movies retrieved", movies));
  }

  static async getById(req: Request, res: Response) {
    const useCase = new GetMovieByIdUseCase(movieRepo);
    const movie = await useCase.execute(req.params.id as string);
    res.status(200).json(ResponseHelper.success("Movie retrieved", movie));
  }

  static async update(req: Request, res: Response) {
    const useCase = new UpdateMovieUseCase(movieRepo);
    const movie = await useCase.execute(req.params.id as string, req.body);
    res.status(200).json(ResponseHelper.success("Movie updated", movie));
  }

  static async delete(req: Request, res: Response) {
    const useCase = new DeleteMovieUseCase(movieRepo);
    await useCase.execute(req.params.id as string);
    res.status(204).send();
  }
}
