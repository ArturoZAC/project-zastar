import { createReservationSeatSchema, CreateReservationSeatInput } from '../../../shared/schemas/reservation-seat.schema';

type Result =
  | { success: true; dto: CreateReservationSeatDto }
  | { success: false; error: string };

export class CreateReservationSeatDto {
  private constructor(public readonly data: CreateReservationSeatInput) {}

  static create(object: unknown): Result {
    const result = createReservationSeatSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new CreateReservationSeatDto(result.data) };
  }
}
