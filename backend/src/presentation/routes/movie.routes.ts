import { Router } from "express";

import { MovieRepositoryImpl } from "../../infrastructure/repositories/movie.repository";
import { MovieController } from "../controllers/movie.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";
import { upload } from "../middlewares/upload.middleware";

export class MovieRoutes {
  readonly router: Router;

  constructor() {
    const repo = new MovieRepositoryImpl();
    const controller = new MovieController(repo);

    this.router = Router();
    this.router.post("/", requireAuth, requireAdmin, upload.single("poster"), controller.create);
    this.router.get("/", controller.getAll); // Public
    this.router.get("/:id", controller.getById); // Public
    this.router.patch(
      "/:id",
      requireAuth,
      requireAdmin,
      upload.single("poster"),
      controller.update,
    );
    this.router.delete("/:id", requireAuth, requireAdmin, controller.delete);
  }
}
