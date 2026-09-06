import { Request, Response } from "express";

import { DeleteUser } from "../../application/use-cases/user/delete-user.use-case";
import { GetAllUsers } from "../../application/use-cases/user/get-all-users.use-case";
import { GetUser } from "../../application/use-cases/user/get-user.use-case";
import { UpdateUser } from "../../application/use-cases/user/update-user.use-case";
import { UserRepository } from "../../domain/repositories/user.repository";
import { handleError } from "../../shared/helpers/handle-error";
import { ResponseHelper } from "../../shared/helpers/response";
import { UpdateUserDto } from "../dtos/user/update-user.dto";

export class UserController {
  constructor(private readonly userRepo: UserRepository) {}

  public getAll = (req: Request, res: Response) => {
    new GetAllUsers(this.userRepo)
      .execute()
      .then((users) => res.status(200).json(ResponseHelper.success("Users retrieved", users)))
      .catch((err) => handleError(err, res));
  };

  public getById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new GetUser(this.userRepo)
      .execute(id)
      .then((user) => res.status(200).json(ResponseHelper.success("User retrieved", user)))
      .catch((err) => handleError(err, res));
  };

  public update = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { error, dto } = UpdateUserDto.create(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    new UpdateUser(this.userRepo)
      .execute(id, dto!.data)
      .then((user) => res.status(200).json(ResponseHelper.success("User updated", user)))
      .catch((err) => handleError(err, res));
  };

  public delete = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new DeleteUser(this.userRepo)
      .execute(id)
      .then(() => res.status(204).send())
      .catch((err) => handleError(err, res));
  };
}
