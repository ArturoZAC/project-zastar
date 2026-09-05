import { Function } from "../../../domain/entities/function.entity";
import { FunctionRepository } from "../../../domain/repositories/function.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { UpdateFunctionInput } from "../../../shared/schemas/function.schema";

export interface UpdateFunctionUseCase {
  execute(id: string, data: UpdateFunctionInput): Promise<Function>;
}

export class UpdateFunction implements UpdateFunctionUseCase {
  constructor(private readonly functionRepo: FunctionRepository) {}

  execute = async (id: string, data: UpdateFunctionInput): Promise<Function> => {
    const existing = await this.functionRepo.findById(id);
    if (!existing) throw new NotFoundError("Function not found");
    return this.functionRepo.update(id, data);
  };
}
