import { Request, Response } from "express";

import { CreateUserUseCase } from "../../application/use-cases/user/create-user.use-case";
import { DeleteUserUseCase } from "../../application/use-cases/user/delete-user.use-case";
import { GetUserUseCase } from "../../application/use-cases/user/get-user.use-case";
import { UpdateUserUseCase } from "../../application/use-cases/user/update-user.use-case";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository";
import { ResponseHelper } from "../../shared/helpers/response";

const userRepo = new UserRepositoryImpl();

export class UserController {
  static async create(req: Request, res: Response) {
    const useCase = new CreateUserUseCase(userRepo);
    const user = await useCase.execute(req.body);
    res.status(201).json(ResponseHelper.created("User created", user));
  }

  static async getAll(_req: Request, res: Response) {
    const users = await userRepo.findAll();
    res.status(200).json(ResponseHelper.success("Users retrieved", users));
  }

  static async getById(req: Request, res: Response) {
    const useCase = new GetUserUseCase(userRepo);
    const user = await useCase.execute(req.params.id as string);
    res.status(200).json(ResponseHelper.success("User retrieved", user));
  }

  static async update(req: Request, res: Response) {
    const useCase = new UpdateUserUseCase(userRepo);
    const user = await useCase.execute(req.params.id as string, req.body);
    res.status(200).json(ResponseHelper.success("User updated", user));
  }

  static async delete(req: Request, res: Response) {
    const useCase = new DeleteUserUseCase(userRepo);
    await useCase.execute(req.params.id as string);
    res.status(204).send();
  }
}
