import { eq } from "drizzle-orm";

import { UserRepository } from "../../domain/repositories/user.repository";
import { UpdateUserInput } from "../../shared/schemas/user.schema";
import { db } from "../database/connection";
import { users } from "../database/schema/user.schema";
import { toUserEntity } from "../mappers/user.mapper";

export class UserRepositoryImpl extends UserRepository {
  async findById(id: string) {
    const [row] = await db.select().from(users).where(eq(users.id, id));
    return row ? toUserEntity(row) : null;
  }

  async findByEmail(email: string) {
    const [row] = await db.select().from(users).where(eq(users.email, email));
    return row ? toUserEntity(row) : null;
  }

  async findAll() {
    const rows = await db.select().from(users);
    return rows.map(toUserEntity);
  }

  async update(id: string, data: UpdateUserInput) {
    const [row] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return toUserEntity(row);
  }

  async softDelete(id: string) {
    await db.update(users).set({ isActive: false, updatedAt: new Date() }).where(eq(users.id, id));
  }
}
