import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  role: z.enum(["admin", "cashier", "user"]).optional().default("user"),
});

export const updateUserSchema = z.object({
  email: z.string().email().max(255).optional(),
  password: z.string().min(8).optional(),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  role: z.enum(["admin", "cashier", "user"]).optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
