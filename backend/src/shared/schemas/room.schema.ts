import { z } from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(1).max(100),
  format: z.enum(["2D", "3D", "IMAX", "4DX"]).optional().default("2D"),
  totalSeats: z.number().int().positive(),
});

export const updateRoomSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  format: z.enum(["2D", "3D", "IMAX", "4DX"]).optional(),
  totalSeats: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
});

export const roomFiltersSchema = z.object({
  isActive: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  format: z.enum(["2D", "3D", "IMAX", "4DX"]).optional(),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
export type RoomFilters = z.infer<typeof roomFiltersSchema>;
