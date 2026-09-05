import { CreateUserInput, createUserSchema } from "../../../shared/schemas/user.schema";

export class CreateUserDto {
  private constructor(public readonly data: CreateUserInput) {}

  static create(object: unknown): { error?: string; dto?: CreateUserDto } {
    const result = createUserSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new CreateUserDto(result.data) };
  }
}
