import { FunctionRepository } from "../../../domain/repositories/function.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { UpdateFunctionInput } from "../../../shared/schemas/function.schema";

export class UpdateFunctionUseCase {
  constructor(private readonly functionRepo: FunctionRepository) {}

  async execute(id: string, data: UpdateFunctionInput) {
    const existing = await this.functionRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("Function not found");
    }

    const func = await this.functionRepo.update(id, data);
    return func;
  }
}
