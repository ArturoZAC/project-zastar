import { Router } from "express";

import { FunctionRepositoryImpl } from "../../infrastructure/repositories/function.repository";
import { MovieRepositoryImpl } from "../../infrastructure/repositories/movie.repository";
import { RoomRepositoryImpl } from "../../infrastructure/repositories/room.repository";
import { SeatRepositoryImpl } from "../../infrastructure/repositories/seat.repository";
import { FunctionController } from "../controllers/function.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

export class FunctionRoutes {
  readonly router: Router;

  constructor() {
    const functionRepo = new FunctionRepositoryImpl();
    const roomRepo = new RoomRepositoryImpl();
    const movieRepo = new MovieRepositoryImpl();
    const seatRepo = new SeatRepositoryImpl();
    const controller = new FunctionController(functionRepo, roomRepo, movieRepo, seatRepo);

    this.router = Router();
    this.router.post("/", requireAuth, requireAdmin, controller.create);
    this.router.get("/", controller.getAll); // Public
    this.router.get("/:id", controller.getById); // Public
    this.router.patch("/:id", requireAuth, requireAdmin, controller.update);
    this.router.delete("/:id", requireAuth, requireAdmin, controller.delete);
  }
}
