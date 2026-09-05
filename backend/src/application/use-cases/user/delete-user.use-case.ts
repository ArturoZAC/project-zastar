import { UserRepository } from "../../../domain/repositories/user.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export interface DeleteUserUseCase {
  execute(id: string): Promise<void>;
}

export class DeleteUser implements DeleteUserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  execute = async (id: string): Promise<void> => {
    const existing = await this.userRepo.findById(id);
    if (!existing) throw new NotFoundError("User not found");
    await this.userRepo.softDelete(id);
  };
}
