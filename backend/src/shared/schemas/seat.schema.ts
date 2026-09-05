import { z } from "zod";

export const createSeatSchema = z.object({
  roomId: z.string().uuid(),
  row: z.string().min(1).max(5),
  number: z.number().int().positive(),
  tier: z.enum(["standard", "vip", "premium"]).optional().default("standard"),
});

export const createManySeatsSchema = z.object({
  roomId: z.string().uuid(),
  seats: z
    .array(
      z.object({
        row: z.string().min(1).max(5),
        number: z.number().int().positive(),
        tier: z.enum(["standard", "vip", "premium"]).optional().default("standard"),
      }),
    )
    .min(1),
});

export type CreateSeatInput = z.infer<typeof createSeatSchema>;
export type CreateManySeatsInput = z.infer<typeof createManySeatsSchema>;
