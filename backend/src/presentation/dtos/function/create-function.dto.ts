import { createFunctionSchema, CreateFunctionInput } from '../../../shared/schemas/function.schema';

type Result =
  | { success: true; dto: CreateFunctionDto }
  | { success: false; error: string };

export class CreateFunctionDto {
  private constructor(public readonly data: CreateFunctionInput) {}

  static create(object: unknown): Result {
    const result = createFunctionSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new CreateFunctionDto(result.data) };
  }
}
