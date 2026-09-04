import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1).max(255),
  synopsis: z.string().optional(),
  durationMinutes: z.number().int().positive(),
  posterUrl: z.string().url().max(500).optional(),
  trailerUrl: z.string().url().max(500).optional(),
  ageRating: z.enum(["APT", "14+", "18+"]),
  releaseDate: z.string().datetime().optional(),
  genreIds: z.array(z.string().uuid()).min(1),
});

export const updateMovieSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  synopsis: z.string().optional(),
  durationMinutes: z.number().int().positive().optional(),
  posterUrl: z.string().url().max(500).optional(),
  trailerUrl: z.string().url().max(500).optional(),
  ageRating: z.enum(["APT", "14+", "18+"]).optional(),
  releaseDate: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
  genreIds: z.array(z.string().uuid()).optional(),
});

export const movieFiltersSchema = z.object({
  isActive: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  title: z.string().optional(),
  ageRating: z.enum(["APT", "14+", "18+"]).optional(),
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
export type UpdateMovieInput = z.infer<typeof updateMovieSchema>;
export type MovieFilters = z.infer<typeof movieFiltersSchema>;
