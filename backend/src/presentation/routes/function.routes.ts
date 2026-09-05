import { Router } from "express";

import { FunctionRepositoryImpl } from "../../infrastructure/repositories/function.repository";
import { MovieRepositoryImpl } from "../../infrastructure/repositories/movie.repository";
import { RoomRepositoryImpl } from "../../infrastructure/repositories/room.repository";
import { SeatRepositoryImpl } from "../../infrastructure/repositories/seat.repository";
import { FunctionController } from "../controllers/function.controller";

export class FunctionRoutes {
  readonly router: Router;

  constructor() {
    const functionRepo = new FunctionRepositoryImpl();
    const roomRepo = new RoomRepositoryImpl();
    const movieRepo = new MovieRepositoryImpl();
    const seatRepo = new SeatRepositoryImpl();
    const controller = new FunctionController(functionRepo, roomRepo, movieRepo, seatRepo);

    this.router = Router();
    this.router.post("/", controller.create);
    this.router.get("/", controller.getAll);
    this.router.get("/:id", controller.getById);
    this.router.patch("/:id", controller.update);
    this.router.delete("/:id", controller.delete);
  }
}
