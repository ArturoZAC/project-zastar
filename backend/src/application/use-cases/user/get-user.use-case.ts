import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export interface GetUserUseCase {
  execute(id: string): Promise<User>;
}

export class GetUser implements GetUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute = async (id: string): Promise<User> => {
    const user = await this.userRepo.findById(id);
    if (!user) throw new NotFoundError("User not found");
    return user;
  };
}
