import { Router } from "express";

import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repository";
import { UserController } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

export class UserRoutes {
  readonly router: Router;

  constructor() {
    const repo = new UserRepositoryImpl();
    const controller = new UserController(repo);

    this.router = Router();
    this.router.post("/", requireAuth, requireAdmin, controller.create);
    this.router.get("/", requireAuth, requireAdmin, controller.getAll);
    this.router.get("/:id", requireAuth, requireAdmin, controller.getById);
    this.router.patch("/:id", requireAuth, requireAdmin, controller.update);
    this.router.delete("/:id", requireAuth, requireAdmin, controller.delete);
  }
}
