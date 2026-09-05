import { CreatePaymentInput, createPaymentSchema } from "../../../shared/schemas/payment.schema";

export class CreatePaymentDto {
  private constructor(public readonly data: CreatePaymentInput) {}

  static create(object: unknown): { error?: string; dto?: CreatePaymentDto } {
    const result = createPaymentSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new CreatePaymentDto(result.data) };
  }
}
