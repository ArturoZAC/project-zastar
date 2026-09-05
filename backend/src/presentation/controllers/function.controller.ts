import { Request, Response } from "express";

import { CreateFunctionUseCase } from "../../application/use-cases/function/create-function.use-case";
import { DeleteFunctionUseCase } from "../../application/use-cases/function/delete-function.use-case";
import {
  GetAllFunctionsUseCase,
  GetFunctionByIdUseCase,
} from "../../application/use-cases/function/get-functions.use-case";
import { UpdateFunctionUseCase } from "../../application/use-cases/function/update-function.use-case";
import { FunctionRepositoryImpl } from "../../infrastructure/repositories/function.repository";
import { MovieRepositoryImpl } from "../../infrastructure/repositories/movie.repository";
import { RoomRepositoryImpl } from "../../infrastructure/repositories/room.repository";
import { SeatRepositoryImpl } from "../../infrastructure/repositories/seat.repository";
import { ResponseHelper } from "../../shared/helpers/response";

const functionRepo = new FunctionRepositoryImpl();
const roomRepo = new RoomRepositoryImpl();
const movieRepo = new MovieRepositoryImpl();
const seatRepo = new SeatRepositoryImpl();

export class FunctionController {
  static async create(req: Request, res: Response) {
    const useCase = new CreateFunctionUseCase(functionRepo, roomRepo, movieRepo, seatRepo);
    const func = await useCase.execute(req.body);
    res.status(201).json(ResponseHelper.created("Function created", func));
  }

  static async getAll(req: Request, res: Response) {
    const useCase = new GetAllFunctionsUseCase(functionRepo);
    const functions = await useCase.execute(req.query);
    res.status(200).json(ResponseHelper.success("Functions retrieved", functions));
  }

  static async getById(req: Request, res: Response) {
    const useCase = new GetFunctionByIdUseCase(functionRepo);
    const func = await useCase.execute(req.params.id as string);
    res.status(200).json(ResponseHelper.success("Function retrieved", func));
  }

  static async update(req: Request, res: Response) {
    const useCase = new UpdateFunctionUseCase(functionRepo);
    const func = await useCase.execute(req.params.id as string, req.body);
    res.status(200).json(ResponseHelper.success("Function updated", func));
  }

  static async delete(req: Request, res: Response) {
    const useCase = new DeleteFunctionUseCase(functionRepo);
    await useCase.execute(req.params.id as string);
    res.status(204).send();
  }
}
