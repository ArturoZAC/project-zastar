import { z } from "zod";

export const createPaymentSchema = z.object({
  reservationId: z.string().uuid(),
  provider: z.literal("IZIPAY"),
  providerTransactionId: z.string().optional(),
  amount: z.number().positive(),
  status: z
    .enum(["PENDING", "SUCCESS", "FAILED"])
    .optional()
    .default("PENDING"),
  rawResponse: z.string().optional(),
});

export const updatePaymentSchema = z.object({
  providerTransactionId: z.string().optional(),
  status: z.enum(["PENDING", "SUCCESS", "FAILED"]).optional(),
  rawResponse: z.string().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>;
