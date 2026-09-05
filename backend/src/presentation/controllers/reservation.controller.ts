import { Request, Response } from "express";

import { CancelReservationUseCase } from "../../application/use-cases/reservation/cancel-reservation.use-case";
import { ConfirmPaymentUseCase } from "../../application/use-cases/reservation/confirm-payment.use-case";
import { CreateReservationUseCase } from "../../application/use-cases/reservation/create-reservation.use-case";
import { GetReservationUseCase } from "../../application/use-cases/reservation/get-reservation.use-case";
import { FunctionRepositoryImpl } from "../../infrastructure/repositories/function.repository";
import { PaymentRepositoryImpl } from "../../infrastructure/repositories/payment.repository";
import { ReservationRepositoryImpl } from "../../infrastructure/repositories/reservation.repository";
import { ReservationSeatRepositoryImpl } from "../../infrastructure/repositories/reservation-seat.repository";
import { SeatRepositoryImpl } from "../../infrastructure/repositories/seat.repository";
import { ResponseHelper } from "../../shared/helpers/response";

const reservationRepo = new ReservationRepositoryImpl();
const reservationSeatRepo = new ReservationSeatRepositoryImpl();
const functionRepo = new FunctionRepositoryImpl();
const seatRepo = new SeatRepositoryImpl();
const paymentRepo = new PaymentRepositoryImpl();

export class ReservationController {
  static async create(req: Request, res: Response) {
    const useCase = new CreateReservationUseCase(
      reservationRepo,
      reservationSeatRepo,
      functionRepo,
      seatRepo,
      paymentRepo,
    );
    const reservation = await useCase.execute(req.body);
    res.status(201).json(ResponseHelper.created("Reservation created", reservation));
  }

  static async getAll(req: Request, res: Response) {
    const useCase = new GetReservationUseCase(reservationRepo, reservationSeatRepo);
    const reservations = await useCase.executeAll(req.query);
    res.status(200).json(ResponseHelper.success("Reservations retrieved", reservations));
  }

  static async getById(req: Request, res: Response) {
    const useCase = new GetReservationUseCase(reservationRepo, reservationSeatRepo);
    const reservation = await useCase.execute(req.params.id as string);
    res.status(200).json(ResponseHelper.success("Reservation retrieved", reservation));
  }

  static async getByTicketCode(req: Request, res: Response) {
    const useCase = new GetReservationUseCase(reservationRepo, reservationSeatRepo);
    const ticketCode = req.params.ticketCode as string;
    const reservation = await useCase.executeByTicketCode(ticketCode);
    res.status(200).json(ResponseHelper.success("Reservation retrieved", reservation));
  }

  static async confirmPayment(req: Request, res: Response) {
    const useCase = new ConfirmPaymentUseCase(reservationRepo, paymentRepo);
    const result = await useCase.execute({
      reservationId: req.params.id as string,
      sourceId: req.body.sourceId,
    });
    res.status(200).json(ResponseHelper.success("Payment processed", result));
  }

  static async cancel(req: Request, res: Response) {
    const useCase = new CancelReservationUseCase(reservationRepo, reservationSeatRepo);
    await useCase.execute(req.params.id as string);
    res.status(204).send();
  }
}
