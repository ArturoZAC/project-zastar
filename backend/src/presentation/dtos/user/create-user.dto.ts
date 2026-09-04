import { CreateUserInput, createUserSchema } from "../../../shared/schemas/user.schema";

type Result = { success: true; dto: CreateUserDto } | { success: false; error: string };

export class CreateUserDto {
  private constructor(public readonly data: CreateUserInput) {}

  static create(object: unknown): Result {
    const result = createUserSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new CreateUserDto(result.data) };
  }
}
