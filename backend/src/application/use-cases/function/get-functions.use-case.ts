import { FunctionRepository } from "../../../domain/repositories/function.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { FunctionFilters } from "../../../shared/schemas/function.schema";

export class GetAllFunctionsUseCase {
  constructor(private readonly functionRepo: FunctionRepository) {}

  async execute(filters?: FunctionFilters) {
    const functions = await this.functionRepo.findAll(filters);
    return functions;
  }
}

export class GetFunctionByIdUseCase {
  constructor(private readonly functionRepo: FunctionRepository) {}

  async execute(id: string) {
    const func = await this.functionRepo.findById(id);
    if (!func) {
      throw new NotFoundError("Function not found");
    }
    return func;
  }
}
