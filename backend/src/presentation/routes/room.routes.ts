import { Router } from "express";

import { RoomRepositoryImpl } from "../../infrastructure/repositories/room.repository";
import { SeatRepositoryImpl } from "../../infrastructure/repositories/seat.repository";
import { RoomController } from "../controllers/room.controller";
import { requireAuth } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/role.middleware";

export class RoomRoutes {
  readonly router: Router;

  constructor() {
    const roomRepo = new RoomRepositoryImpl();
    const seatRepo = new SeatRepositoryImpl();
    const controller = new RoomController(roomRepo, seatRepo);

    this.router = Router();
    this.router.post("/", requireAuth, requireAdmin, controller.create);
    this.router.get("/", controller.getAll); // Public
    this.router.get("/:id", controller.getById); // Public
    this.router.patch("/:id", requireAuth, requireAdmin, controller.update);
    this.router.delete("/:id", requireAuth, requireAdmin, controller.delete);
  }
}
