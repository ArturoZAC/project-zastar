import { Router } from "express";

import { GenreRepositoryImpl } from "../../infrastructure/repositories/genre.repository";
import { GenreController } from "../controllers/genre.controller";

export class GenreRoutes {
  readonly router: Router;

  constructor() {
    const repo = new GenreRepositoryImpl();
    const controller = new GenreController(repo);

    this.router = Router();
    this.router.post("/", controller.create);
    this.router.get("/", controller.getAll);
    this.router.get("/:id", controller.getById);
    this.router.patch("/:id", controller.update);
    this.router.delete("/:id", controller.delete);
  }
}
