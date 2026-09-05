import { UserRepository } from "../../../domain/repositories/user.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { UpdateUserInput } from "../../../shared/schemas/user.schema";

export class UpdateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string, data: UpdateUserInput) {
    const existing = await this.userRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("User not found");
    }

    const user = await this.userRepo.update(id, data);
    return user;
  }
}
