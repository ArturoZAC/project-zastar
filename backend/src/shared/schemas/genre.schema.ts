import { z } from "zod";

export const createGenreSchema = z.object({
  name: z.string().min(1).max(100),
});

export const updateGenreSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  isActive: z.boolean().optional(),
});

export type CreateGenreInput = z.infer<typeof createGenreSchema>;
export type UpdateGenreInput = z.infer<typeof updateGenreSchema>;
