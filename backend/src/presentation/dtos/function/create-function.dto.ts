import { CreateFunctionInput, createFunctionSchema } from "../../../shared/schemas/function.schema";

export class CreateFunctionDto {
  private constructor(public readonly data: CreateFunctionInput) {}

  static create(object: unknown): { error?: string; dto?: CreateFunctionDto } {
    const result = createFunctionSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new CreateFunctionDto(result.data) };
  }
}
