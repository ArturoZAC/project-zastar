import { Router } from "express";
import { z } from "zod";

import {
  createReservationSchema,
  reservationFiltersSchema,
} from "../../shared/schemas/reservation.schema";
import { ReservationController } from "../controllers/reservation.controller";
import { validateBody, validateParams, validateQuery } from "../middlewares/validation.middleware";

const router: Router = Router();

const idParamSchema = z.object({
  id: z.string().uuid(),
});

const ticketCodeParamSchema = z.object({
  ticketCode: z.string().min(1),
});

const confirmPaymentSchema = z.object({
  sourceId: z.string().min(1),
});

router.post("/", validateBody(createReservationSchema), ReservationController.create);
router.get("/", validateQuery(reservationFiltersSchema), ReservationController.getAll);
router.get(
  "/ticket/:ticketCode",
  validateParams(ticketCodeParamSchema),
  ReservationController.getByTicketCode,
);
router.get("/:id", validateParams(idParamSchema), ReservationController.getById);
router.post(
  "/:id/pay",
  validateParams(idParamSchema),
  validateBody(confirmPaymentSchema),
  ReservationController.confirmPayment,
);
router.post("/:id/cancel", validateParams(idParamSchema), ReservationController.cancel);

export default router;
