import { UserRepository } from "../../../domain/repositories/user.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export class DeleteUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string) {
    const existing = await this.userRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("User not found");
    }

    await this.userRepo.softDelete(id);
  }
}
