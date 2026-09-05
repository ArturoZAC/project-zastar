import { z } from "zod";

export const createReservationSchema = z.object({
  functionId: z.string().uuid(),
  guestEmail: z.string().email().max(255),
  guestName: z.string().min(1).max(255),
  guestPhone: z.string().min(1).max(20).optional(),
  seatIds: z.array(z.string().uuid()).min(1).max(10),
});

export const updateReservationSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "expired"]).optional(),
  expiresAt: z.string().datetime().optional(),
});

export const reservationFiltersSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "expired"]).optional(),
  guestEmail: z.string().email().optional(),
  functionId: z.string().uuid().optional(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
export type UpdateReservationInput = z.infer<typeof updateReservationSchema>;
export type ReservationFilters = z.infer<typeof reservationFiltersSchema>;
