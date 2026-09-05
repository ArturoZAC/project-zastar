import { FunctionRepository } from "../../../domain/repositories/function.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export interface DeleteFunctionUseCase {
  execute(id: string): Promise<void>;
}

export class DeleteFunction implements DeleteFunctionUseCase {
  constructor(private readonly functionRepo: FunctionRepository) {}

  execute = async (id: string): Promise<void> => {
    const existing = await this.functionRepo.findById(id);
    if (!existing) throw new NotFoundError("Function not found");
    await this.functionRepo.softDelete(id);
  };
}
