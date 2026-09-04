import { User } from '../entities/user.entity';
import { CreateUserInput, UpdateUserInput } from '../../shared/schemas/user.schema';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract create(data: CreateUserInput): Promise<User>;
  abstract update(id: string, data: UpdateUserInput): Promise<User>;
  abstract softDelete(id: string): Promise<void>;
}
