import { Request, Response } from "express";

import { CancelReservation } from "../../application/use-cases/reservation/cancel-reservation.use-case";
import { ConfirmPayment } from "../../application/use-cases/reservation/confirm-payment.use-case";
import { CreateReservation } from "../../application/use-cases/reservation/create-reservation.use-case";
import { GetReservation } from "../../application/use-cases/reservation/get-reservation.use-case";
import { FunctionRepository } from "../../domain/repositories/function.repository";
import { PaymentRepository } from "../../domain/repositories/payment.repository";
import { ReservationRepository } from "../../domain/repositories/reservation.repository";
import { ReservationSeatRepository } from "../../domain/repositories/reservation-seat.repository";
import { SeatRepository } from "../../domain/repositories/seat.repository";
import { handleError } from "../../shared/helpers/handle-error";
import { ResponseHelper } from "../../shared/helpers/response";
import { CreateReservationDto } from "../dtos/reservation/create-reservation.dto";

export class ReservationController {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    private readonly reservationSeatRepo: ReservationSeatRepository,
    private readonly functionRepo: FunctionRepository,
    private readonly seatRepo: SeatRepository,
    private readonly paymentRepo: PaymentRepository,
  ) {}

  public create = (req: Request, res: Response) => {
    const { error, dto } = CreateReservationDto.create(req.body);
    if (error) return res.status(400).json({ success: false, message: error });

    new CreateReservation(
      this.reservationRepo,
      this.reservationSeatRepo,
      this.functionRepo,
      this.seatRepo,
      this.paymentRepo,
    )
      .execute(dto!.data)
      .then((reservation) =>
        res.status(201).json(ResponseHelper.created("Reservation created", reservation)),
      )
      .catch((err) => handleError(err, res));
  };

  public getAll = (req: Request, res: Response) => {
    new GetReservation(this.reservationRepo, this.reservationSeatRepo)
      .executeAll(req.query as Record<string, string>)
      .then((reservations) =>
        res.status(200).json(ResponseHelper.success("Reservations retrieved", reservations)),
      )
      .catch((err) => handleError(err, res));
  };

  public getById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new GetReservation(this.reservationRepo, this.reservationSeatRepo)
      .execute(id)
      .then((reservation) =>
        res.status(200).json(ResponseHelper.success("Reservation retrieved", reservation)),
      )
      .catch((err) => handleError(err, res));
  };

  public getByTicketCode = (req: Request<{ ticketCode: string }>, res: Response) => {
    const { ticketCode } = req.params;

    new GetReservation(this.reservationRepo, this.reservationSeatRepo)
      .executeByTicketCode(ticketCode)
      .then((reservation) =>
        res.status(200).json(ResponseHelper.success("Reservation retrieved", reservation)),
      )
      .catch((err) => handleError(err, res));
  };

  public confirmPayment = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { sourceId } = req.body;

    if (!sourceId || typeof sourceId !== "string") {
      return res.status(400).json({ success: false, message: "sourceId is required" });
    }

    new ConfirmPayment(this.reservationRepo, this.paymentRepo)
      .execute({ reservationId: id, sourceId })
      .then((result) => res.status(200).json(ResponseHelper.success("Payment processed", result)))
      .catch((err) => handleError(err, res));
  };

  public cancel = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    new CancelReservation(this.reservationRepo, this.reservationSeatRepo)
      .execute(id)
      .then(() => res.status(204).send())
      .catch((err) => handleError(err, res));
  };
}
