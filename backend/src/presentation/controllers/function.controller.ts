import { Request, Response } from "express";

import { CreateFunction } from "../../application/use-cases/function/create-function.use-case";
import { DeleteFunction } from "../../application/use-cases/function/delete-function.use-case";
import {
  GetAllFunctions,
  GetFunctionById,
} from "../../application/use-cases/function/get-functions.use-case";
import { UpdateFunction } from "../../application/use-cases/function/update-function.use-case";
import { FunctionRepository } from "../../domain/repositories/function.repository";
import { MovieRepository } from "../../domain/repositories/movie.repository";
import { RoomRepository } from "../../domain/repositories/room.repository";
import { SeatRepository } from "../../domain/repositories/seat.repository";
import { handleError } from "../../shared/helpers/handle-error";
import { ResponseHelper } from "../../shared/helpers/response";
import { CreateFunctionDto } from "../dtos/function/create-function.dto";
import { UpdateFunctionDto } from "../dtos/function/update-function.dto";

export class FunctionController {
  constructor(
    private readonly functionRepo: FunctionRepository,
    private readonly roomRepo: RoomRepository,
    private readonly movieRepo: MovieRepository,
    private readonly seatRepo: SeatRepository,
  ) {}

  public create = (req: Request, res: Response) => {
    const { error, dto } = CreateFunctionDto.create(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    new CreateFunction(this.functionRepo, this.roomRepo, this.movieRepo, this.seatRepo)
      .execute(dto!.data)
      .then((func) => res.status(201).json(ResponseHelper.created("Function created", func)))
      .catch((err) => handleError(err, res));
  };

  public getAll = (req: Request, res: Response) => {
    new GetAllFunctions(this.functionRepo)
      .execute(req.query as Record<string, string>)
      .then((functions) =>
        res.status(200).json(ResponseHelper.success("Functions retrieved", functions)),
      )
      .catch((err) => handleError(err, res));
  };

  public getById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new GetFunctionById(this.functionRepo)
      .execute(id)
      .then((func) => res.status(200).json(ResponseHelper.success("Function retrieved", func)))
      .catch((err) => handleError(err, res));
  };

  public update = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { error, dto } = UpdateFunctionDto.create(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    new UpdateFunction(this.functionRepo)
      .execute(id, dto!.data)
      .then((func) => res.status(200).json(ResponseHelper.success("Function updated", func)))
      .catch((err) => handleError(err, res));
  };

  public delete = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new DeleteFunction(this.functionRepo)
      .execute(id)
      .then(() => res.status(204).send())
      .catch((err) => handleError(err, res));
  };
}
