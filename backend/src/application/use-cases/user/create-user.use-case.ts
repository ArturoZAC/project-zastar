import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { CreateUserInput } from "../../../shared/schemas/user.schema";

export interface CreateUserUseCase {
  execute(data: CreateUserInput): Promise<User>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute = async (data: CreateUserInput): Promise<User> => {
    return this.userRepo.create(data);
  };
}
