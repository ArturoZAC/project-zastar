import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { UpdateUserInput } from "../../../shared/schemas/user.schema";

export interface UpdateUserUseCase {
  execute(id: string, data: UpdateUserInput): Promise<User>;
}

export class UpdateUser implements UpdateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute = async (id: string, data: UpdateUserInput): Promise<User> => {
    const existing = await this.userRepo.findById(id);
    if (!existing) throw new NotFoundError("User not found");
    return this.userRepo.update(id, data);
  };
}
