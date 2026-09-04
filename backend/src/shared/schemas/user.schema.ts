import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email().max(255),
  passwordHash: z.string().min(1),
  fullName: z.string().min(1).max(150),
  role: z.enum(['CUSTOMER', 'ADMIN']).optional().default('CUSTOMER'),
});

export const updateUserSchema = z.object({
  email: z.string().email().max(255).optional(),
  fullName: z.string().min(1).max(150).optional(),
  role: z.enum(['CUSTOMER', 'ADMIN']).optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
