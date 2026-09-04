import {
  CreateFunctionInput,
  FunctionFilters,
  UpdateFunctionInput,
} from "../../shared/schemas/function.schema";
import { Function } from "../entities/function.entity";

export abstract class FunctionRepository {
  abstract findById(id: string): Promise<Function | null>;
  abstract findAll(filters?: FunctionFilters): Promise<Function[]>;
  abstract create(data: CreateFunctionInput): Promise<Function>;
  abstract update(id: string, data: UpdateFunctionInput): Promise<Function>;
  abstract softDelete(id: string): Promise<void>;
}
