import { UserRepository } from "../../../domain/repositories/user.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export class GetUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return user;
  }
}
