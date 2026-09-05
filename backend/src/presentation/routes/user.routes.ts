import { Router } from "express";

import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository";
import { UserController } from "../controllers/user.controller";

export class UserRoutes {
  readonly router: Router;

  constructor() {
    const repo = new UserRepositoryImpl();
    const controller = new UserController(repo);

    this.router = Router();
    this.router.post("/", controller.create);
    this.router.get("/", controller.getAll);
    this.router.get("/:id", controller.getById);
    this.router.patch("/:id", controller.update);
    this.router.delete("/:id", controller.delete);
  }
}
