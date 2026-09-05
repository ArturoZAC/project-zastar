import { Router } from "express";

import { RoomRepositoryImpl } from "../../infrastructure/repositories/room.repository";
import { SeatRepositoryImpl } from "../../infrastructure/repositories/seat.repository";
import { RoomController } from "../controllers/room.controller";

export class RoomRoutes {
  readonly router: Router;

  constructor() {
    const roomRepo = new RoomRepositoryImpl();
    const seatRepo = new SeatRepositoryImpl();
    const controller = new RoomController(roomRepo, seatRepo);

    this.router = Router();
    this.router.post("/", controller.create);
    this.router.get("/", controller.getAll);
    this.router.get("/:id", controller.getById);
    this.router.patch("/:id", controller.update);
    this.router.delete("/:id", controller.delete);
  }
}
