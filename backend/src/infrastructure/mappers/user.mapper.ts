import { User } from "../../domain/entities/user.entity";
import { users } from "../database/schema/user.schema";

type DbRow = typeof users.$inferSelect;

export const toUserEntity = (row: DbRow): User => ({
  id: row.id,
  email: row.email,
  password: row.password,
  firstName: row.firstName,
  lastName: row.lastName,
  role: row.role as User["role"],
  isActive: row.isActive,
  createdAt: row.createdAt,
  updatedAt: row.updatedAt,
  deletedAt: row.deletedAt ?? undefined,
});
