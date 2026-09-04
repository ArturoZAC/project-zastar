import { z } from "zod";

export const createRoomSchema = z.object({
  name: z.string().min(1).max(50),
  defaultFormat: z.enum(["2D", "3D"]).optional().default("2D"),
  rows: z.number().int().positive(),
  columns: z.number().int().positive(),
});

export const updateRoomSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  defaultFormat: z.enum(["2D", "3D"]).optional(),
  rows: z.number().int().positive().optional(),
  columns: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
});

export const roomFiltersSchema = z.object({
  isActive: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  defaultFormat: z.enum(["2D", "3D"]).optional(),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>;
export type UpdateRoomInput = z.infer<typeof updateRoomSchema>;
export type RoomFilters = z.infer<typeof roomFiltersSchema>;
