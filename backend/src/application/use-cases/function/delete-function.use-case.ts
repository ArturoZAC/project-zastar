import { FunctionRepository } from "../../../domain/repositories/function.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export class DeleteFunctionUseCase {
  constructor(private readonly functionRepo: FunctionRepository) {}

  async execute(id: string) {
    const existing = await this.functionRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("Function not found");
    }

    await this.functionRepo.softDelete(id);
  }
}
