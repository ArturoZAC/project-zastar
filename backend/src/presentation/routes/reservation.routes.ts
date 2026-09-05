import { Router } from "express";

import { FunctionRepositoryImpl } from "../../infrastructure/repositories/function.repository";
import { PaymentRepositoryImpl } from "../../infrastructure/repositories/payment.repository";
import { ReservationRepositoryImpl } from "../../infrastructure/repositories/reservation.repository";
import { ReservationSeatRepositoryImpl } from "../../infrastructure/repositories/reservation-seat.repository";
import { SeatRepositoryImpl } from "../../infrastructure/repositories/seat.repository";
import { ReservationController } from "../controllers/reservation.controller";
import { paymentLimiter } from "../middlewares/rate-limit.middleware";

export class ReservationRoutes {
  readonly router: Router;

  constructor() {
    const reservationRepo = new ReservationRepositoryImpl();
    const reservationSeatRepo = new ReservationSeatRepositoryImpl();
    const functionRepo = new FunctionRepositoryImpl();
    const seatRepo = new SeatRepositoryImpl();
    const paymentRepo = new PaymentRepositoryImpl();
    const controller = new ReservationController(
      reservationRepo,
      reservationSeatRepo,
      functionRepo,
      seatRepo,
      paymentRepo,
    );

    this.router = Router();
    this.router.post("/", controller.create);
    this.router.get("/", controller.getAll);
    this.router.get("/ticket/:ticketCode", controller.getByTicketCode);
    this.router.get("/:id", controller.getById);
    this.router.post("/:id/pay", paymentLimiter, controller.confirmPayment);
    this.router.post("/:id/cancel", controller.cancel);
  }
}
