import { Function } from "../../../domain/entities/function.entity";
import { FunctionRepository } from "../../../domain/repositories/function.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { FunctionFilters } from "../../../shared/schemas/function.schema";

export interface GetAllFunctionsUseCase {
  execute(filters?: FunctionFilters): Promise<Function[]>;
}

export class GetAllFunctions implements GetAllFunctionsUseCase {
  constructor(private readonly functionRepo: FunctionRepository) {}

  execute = async (filters?: FunctionFilters): Promise<Function[]> => {
    return this.functionRepo.findAll(filters);
  };
}

export interface GetFunctionByIdUseCase {
  execute(id: string): Promise<Function>;
}

export class GetFunctionById implements GetFunctionByIdUseCase {
  constructor(private readonly functionRepo: FunctionRepository) {}

  execute = async (id: string): Promise<Function> => {
    const func = await this.functionRepo.findById(id);
    if (!func) throw new NotFoundError("Function not found");
    return func;
  };
}
