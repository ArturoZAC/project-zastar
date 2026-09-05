import { Request, Response } from "express";

import { CreateMovie } from "../../application/use-cases/movie/create-movie.use-case";
import { DeleteMovie } from "../../application/use-cases/movie/delete-movie.use-case";
import { GetAllMovies, GetMovieById } from "../../application/use-cases/movie/get-movies.use-case";
import { UpdateMovie } from "../../application/use-cases/movie/update-movie.use-case";
import { MovieRepository } from "../../domain/repositories/movie.repository";
import { handleError } from "../../shared/helpers/handle-error";
import { ResponseHelper } from "../../shared/helpers/response";
import { CreateMovieDto } from "../dtos/movie/create-movie.dto";
import { UpdateMovieDto } from "../dtos/movie/update-movie.dto";

export class MovieController {
  constructor(private readonly movieRepo: MovieRepository) {}

  public create = (req: Request, res: Response) => {
    const { error, dto } = CreateMovieDto.create(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    new CreateMovie(this.movieRepo)
      .execute(dto!.data)
      .then((movie) => res.status(201).json(ResponseHelper.created("Movie created", movie)))
      .catch((err) => handleError(err, res));
  };

  public getAll = (req: Request, res: Response) => {
    new GetAllMovies(this.movieRepo)
      .execute(req.query as Record<string, string>)
      .then((movies) => res.status(200).json(ResponseHelper.success("Movies retrieved", movies)))
      .catch((err) => handleError(err, res));
  };

  public getById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new GetMovieById(this.movieRepo)
      .execute(id)
      .then((movie) => res.status(200).json(ResponseHelper.success("Movie retrieved", movie)))
      .catch((err) => handleError(err, res));
  };

  public update = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { error, dto } = UpdateMovieDto.create(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    new UpdateMovie(this.movieRepo)
      .execute(id, dto!.data)
      .then((movie) => res.status(200).json(ResponseHelper.success("Movie updated", movie)))
      .catch((err) => handleError(err, res));
  };

  public delete = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new DeleteMovie(this.movieRepo)
      .execute(id)
      .then(() => res.status(204).send())
      .catch((err) => handleError(err, res));
  };
}
