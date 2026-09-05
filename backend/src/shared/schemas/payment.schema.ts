import { z } from "zod";

export const createPaymentSchema = z.object({
  reservationId: z.string().uuid(),
  provider: z.enum(["culqi", "izipay"]),
  providerPaymentId: z.string().optional(),
  amount: z.number().positive(),
  status: z.enum(["pending", "completed", "failed", "refunded"]).optional().default("pending"),
});

export const updatePaymentSchema = z.object({
  providerPaymentId: z.string().optional(),
  status: z.enum(["pending", "completed", "failed", "refunded"]).optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
