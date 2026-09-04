import { z } from "zod";

export const createReservationSchema = z
  .object({
    ticketCode: z.string().min(1).max(12),
    userId: z.string().uuid().optional(),
    guestFullName: z.string().min(1).max(150).optional(),
    guestEmail: z.string().email().max(255).optional(),
    guestPhone: z.string().min(1).max(20).optional(),
    functionId: z.string().uuid(),
    totalAmount: z.number().positive(),
    expiresAt: z.string().datetime(),
  })
  .refine((data) => data.userId || data.guestEmail, {
    message: "Either userId or guestEmail must be provided",
  });

export const updateReservationSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"]).optional(),
  confirmedAt: z.string().datetime().optional(),
});

export const reservationFiltersSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "EXPIRED"]).optional(),
  userId: z.string().uuid().optional(),
  guestEmail: z.string().email().optional(),
  functionId: z.string().uuid().optional(),
});

export type CreateReservationInput = z.infer<typeof createReservationSchema>;
export type UpdateReservationInput = z.infer<typeof updateReservationSchema>;
export type ReservationFilters = z.infer<typeof reservationFiltersSchema>;
