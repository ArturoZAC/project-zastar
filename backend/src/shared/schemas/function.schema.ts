import { z } from "zod";

export const createFunctionSchema = z.object({
  movieId: z.string().uuid(),
  roomId: z.string().uuid(),
  format: z.enum(["2D", "3D", "IMAX", "4DX"]),
  language: z.enum(["subtitled", "dubbed", "original"]),
  startTime: z.string().datetime(),
  basePrice: z.number().positive(),
  vipSurcharge: z.number().positive().optional().default(0),
});

export const updateFunctionSchema = z.object({
  format: z.enum(["2D", "3D", "IMAX", "4DX"]).optional(),
  language: z.enum(["subtitled", "dubbed", "original"]).optional(),
  startTime: z.string().datetime().optional(),
  basePrice: z.number().positive().optional(),
  vipSurcharge: z.number().positive().optional(),
  isActive: z.boolean().optional(),
});

export const functionFiltersSchema = z.object({
  movieId: z.string().uuid().optional(),
  roomId: z.string().uuid().optional(),
  isActive: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
});

export type CreateFunctionInput = z.infer<typeof createFunctionSchema>;
export type UpdateFunctionInput = z.infer<typeof updateFunctionSchema>;
export type FunctionFilters = z.infer<typeof functionFiltersSchema>;
