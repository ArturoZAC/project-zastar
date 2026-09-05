import { Router } from "express";

import { MovieRepositoryImpl } from "../../infrastructure/repositories/movie.repository";
import { MovieController } from "../controllers/movie.controller";

export class MovieRoutes {
  readonly router: Router;

  constructor() {
    const repo = new MovieRepositoryImpl();
    const controller = new MovieController(repo);

    this.router = Router();
    this.router.post("/", controller.create);
    this.router.get("/", controller.getAll);
    this.router.get("/:id", controller.getById);
    this.router.patch("/:id", controller.update);
    this.router.delete("/:id", controller.delete);
  }
}
