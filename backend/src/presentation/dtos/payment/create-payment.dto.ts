import { createPaymentSchema, CreatePaymentInput } from '../../../shared/schemas/payment.schema';

type Result =
  | { success: true; dto: CreatePaymentDto }
  | { success: false; error: string };

export class CreatePaymentDto {
  private constructor(public readonly data: CreatePaymentInput) {}

  static create(object: unknown): Result {
    const result = createPaymentSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new CreatePaymentDto(result.data) };
  }
}
