import { and, eq, gte, lte } from "drizzle-orm";

import { FunctionRepository } from "../../domain/repositories/function.repository";
import {
  CreateFunctionInput,
  FunctionFilters,
  UpdateFunctionInput,
} from "../../shared/schemas/function.schema";
import { db } from "../database/connection";
import { functions } from "../database/schema/function.schema";
import { toFunctionEntity } from "../mappers/function.mapper";

export class FunctionRepositoryImpl extends FunctionRepository {
  async findById(id: string) {
    const [row] = await db.select().from(functions).where(eq(functions.id, id));
    return row ? toFunctionEntity(row) : null;
  }

  async findAll(filters?: FunctionFilters) {
    const conditions = [];

    if (filters?.movieId) {
      conditions.push(eq(functions.movieId, filters.movieId));
    }
    if (filters?.roomId) {
      conditions.push(eq(functions.roomId, filters.roomId));
    }
    if (filters?.isActive !== undefined) {
      conditions.push(eq(functions.isActive, filters.isActive));
    }
    if (filters?.startDate) {
      conditions.push(gte(functions.startTime, new Date(filters.startDate)));
    }
    if (filters?.endDate) {
      conditions.push(lte(functions.startTime, new Date(filters.endDate)));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;
    const rows = await db.select().from(functions).where(where);
    return rows.map(toFunctionEntity);
  }

  async create(data: CreateFunctionInput) {
    const dbData = {
      ...data,
      startTime: new Date(data.startTime),
      basePrice: String(data.basePrice),
      vipSurcharge: String(data.vipSurcharge ?? 0),
    };
    const [row] = await db.insert(functions).values(dbData).returning();
    return toFunctionEntity(row);
  }

  async update(id: string, data: UpdateFunctionInput) {
    const dbData: Record<string, unknown> = { updatedAt: new Date() };
    if (data.format) dbData.format = data.format;
    if (data.language) dbData.language = data.language;
    if (data.startTime) dbData.startTime = new Date(data.startTime);
    if (data.basePrice !== undefined) dbData.basePrice = data.basePrice;
    if (data.vipSurcharge !== undefined) dbData.vipSurcharge = data.vipSurcharge;
    if (data.isActive !== undefined) dbData.isActive = data.isActive;
    const [row] = await db.update(functions).set(dbData).where(eq(functions.id, id)).returning();
    return toFunctionEntity(row);
  }

  async softDelete(id: string) {
    await db.update(functions).set({ deletedAt: new Date() }).where(eq(functions.id, id));
  }
}
