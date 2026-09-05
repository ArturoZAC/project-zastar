import { Router } from "express";

import { GenreRepositoryImpl } from "../../infrastructure/repositories/genre.repository";
import { GenreController } from "../controllers/genre.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

export class GenreRoutes {
  readonly router: Router;

  constructor() {
    const repo = new GenreRepositoryImpl();
    const controller = new GenreController(repo);

    this.router = Router();
    this.router.post("/", requireAuth, requireAdmin, controller.create);
    this.router.get("/", controller.getAll); // Public
    this.router.get("/:id", controller.getById); // Public
    this.router.patch("/:id", requireAuth, requireAdmin, controller.update);
    this.router.delete("/:id", requireAuth, requireAdmin, controller.delete);
  }
}
