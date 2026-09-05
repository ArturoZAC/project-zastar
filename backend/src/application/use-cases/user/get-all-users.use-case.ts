import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";

export interface GetAllUsersUseCase {
  execute(): Promise<User[]>;
}

export class GetAllUsers implements GetAllUsersUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute = async (): Promise<User[]> => {
    return this.userRepo.findAll();
  };
}
