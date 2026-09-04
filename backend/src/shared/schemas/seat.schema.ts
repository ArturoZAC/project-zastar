import { z } from "zod";

export const createSeatSchema = z.object({
  roomId: z.string().uuid(),
  row: z.string().min(1).max(5),
  column: z.number().int().positive(),
  tier: z.enum(["STANDARD", "VIP"]).optional().default("STANDARD"),
});

export const createManySeatsSchema = z.object({
  roomId: z.string().uuid(),
  seats: z
    .array(
      z.object({
        row: z.string().min(1).max(5),
        column: z.number().int().positive(),
        tier: z.enum(["STANDARD", "VIP"]).optional().default("STANDARD"),
      }),
    )
    .min(1),
});

export type CreateSeatInput = z.infer<typeof createSeatSchema>;
export type CreateManySeatsInput = z.infer<typeof createManySeatsSchema>;
