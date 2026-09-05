import { Request, Response } from "express";

import { CreateGenre } from "../../application/use-cases/genre/create-genre.use-case";
import { DeleteGenre } from "../../application/use-cases/genre/delete-genre.use-case";
import { GetAllGenres } from "../../application/use-cases/genre/get-all-genres.use-case";
import { GetGenreById } from "../../application/use-cases/genre/get-genre-by-id.use-case";
import { UpdateGenre } from "../../application/use-cases/genre/update-genre.use-case";
import { GenreRepository } from "../../domain/repositories/genre.repository";
import { handleError } from "../../shared/helpers/handle-error";
import { ResponseHelper } from "../../shared/helpers/response";
import { CreateGenreDto } from "../dtos/genre/create-genre.dto";
import { UpdateGenreDto } from "../dtos/genre/update-genre.dto";

export class GenreController {
  constructor(private readonly genreRepo: GenreRepository) {}

  public create = (req: Request, res: Response) => {
    const { error, dto } = CreateGenreDto.create(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    new CreateGenre(this.genreRepo)
      .execute(dto!.data)
      .then((genre) => res.status(201).json(ResponseHelper.created("Genre created", genre)))
      .catch((err) => handleError(err, res));
  };

  public getAll = (req: Request, res: Response) => {
    new GetAllGenres(this.genreRepo)
      .execute()
      .then((genres) => res.status(200).json(ResponseHelper.success("Genres retrieved", genres)))
      .catch((err) => handleError(err, res));
  };

  public getById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new GetGenreById(this.genreRepo)
      .execute(id)
      .then((genre) => res.status(200).json(ResponseHelper.success("Genre retrieved", genre)))
      .catch((err) => handleError(err, res));
  };

  public update = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { error, dto } = UpdateGenreDto.create(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    new UpdateGenre(this.genreRepo)
      .execute(id, dto!.data)
      .then((genre) => res.status(200).json(ResponseHelper.success("Genre updated", genre)))
      .catch((err) => handleError(err, res));
  };

  public delete = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new DeleteGenre(this.genreRepo)
      .execute(id)
      .then(() => res.status(204).send())
      .catch((err) => handleError(err, res));
  };
}
