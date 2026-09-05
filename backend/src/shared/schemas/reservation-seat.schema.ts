import { z } from "zod";

export const createReservationSeatSchema = z.object({
  reservationId: z.string().uuid(),
  seatId: z.string().uuid(),
  price: z.number().positive(),
});

export const createManyReservationSeatsSchema = z.array(createReservationSeatSchema).min(1);

export type CreateReservationSeatInput = z.infer<typeof createReservationSeatSchema>;
export type CreateManyReservationSeatsInput = z.infer<typeof createManyReservationSeatsSchema>;
