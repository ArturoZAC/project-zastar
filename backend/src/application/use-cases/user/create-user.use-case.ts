import { UserRepository } from "../../../domain/repositories/user.repository";
import { ConflictError } from "../../../shared/errors/conflict-error";
import { CreateUserInput } from "../../../shared/schemas/user.schema";

export class CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(data: CreateUserInput) {
    const existing = await this.userRepo.findByEmail(data.email);
    if (existing) {
      throw new ConflictError("Email already in use");
    }

    const user = await this.userRepo.create(data);
    return user;
  }
}
