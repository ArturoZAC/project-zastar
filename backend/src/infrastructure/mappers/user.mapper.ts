import { User } from "../../domain/entities/user.entity";
import { users } from "../database/schema/user.schema";

type DbRow = typeof users.$inferSelect;

export const toUserEntity = (row: DbRow): User => ({
  id: row.id,
  name: row.name,
  email: row.email,
  emailVerified: row.emailVerified,
  image: row.image ?? undefined,
  firstName: row.firstName ?? undefined,
  lastName: row.lastName ?? undefined,
  role: row.role as User["role"],
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
});
