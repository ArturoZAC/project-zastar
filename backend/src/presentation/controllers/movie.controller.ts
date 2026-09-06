import { Request, Response } from "express";

import { CreateMovie } from "../../application/use-cases/movie/create-movie.use-case";
import { DeleteMovie } from "../../application/use-cases/movie/delete-movie.use-case";
import { GetAllMovies, GetMovieById } from "../../application/use-cases/movie/get-movies.use-case";
import { UpdateMovie } from "../../application/use-cases/movie/update-movie.use-case";
import { MovieRepository } from "../../domain/repositories/movie.repository";
import { R2Storage } from "../../infrastructure/storage/r2";
import { handleError } from "../../shared/helpers/handle-error";
import { ResponseHelper } from "../../shared/helpers/response";
import { CreateMovieDto } from "../dtos/movie/create-movie.dto";
import { UpdateMovieDto } from "../dtos/movie/update-movie.dto";

export class MovieController {
  constructor(private readonly movieRepo: MovieRepository) {}

  public create = async (req: Request, res: Response) => {
    try {
      const body = { ...req.body };

      // Parse durationMinutes to number if it comes as string (FormData)
      if (body.durationMinutes) {
        body.durationMinutes = Number(body.durationMinutes);
      }

      // Handle poster upload
      if (req.file) {
        const key = R2Storage.generateKey("films", req.file.originalname, body.title);
        await R2Storage.uploadFile(req.file.buffer, key, req.file.mimetype);
        body.posterKey = key;
      }

      const { error, dto } = CreateMovieDto.create(body);
      if (error) return res.status(400).json({ success: false, message: error });

      const movie = await new CreateMovie(this.movieRepo).execute(dto!.data);
      res.status(201).json(ResponseHelper.created("Movie created", movie));
    } catch (err) {
      handleError(err, res);
    }
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

  public update = async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const body = { ...req.body };

      // Parse durationMinutes to number if it comes as string (FormData)
      if (body.durationMinutes) {
        body.durationMinutes = Number(body.durationMinutes);
      }

      // Handle poster upload
      if (req.file) {
        const key = R2Storage.generateKey("films", req.file.originalname, id);
        await R2Storage.uploadFile(req.file.buffer, key, req.file.mimetype);
        body.posterKey = key;
      }

      const { error, dto } = UpdateMovieDto.create(body);
      if (error) return res.status(400).json({ success: false, message: error });

      const movie = await new UpdateMovie(this.movieRepo).execute(id, dto!.data);
      res.status(200).json(ResponseHelper.success("Movie updated", movie));
    } catch (err) {
      handleError(err, res);
    }
  };

  public delete = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new DeleteMovie(this.movieRepo)
      .execute(id)
      .then(() => res.status(204).send())
      .catch((err) => handleError(err, res));
  };
}
