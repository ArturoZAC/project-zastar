import {
  CreateReservationSeatInput,
  createReservationSeatSchema,
} from "../../../shared/schemas/reservation-seat.schema";

export class CreateReservationSeatDto {
  private constructor(public readonly data: CreateReservationSeatInput) {}

  static create(object: unknown): { error?: string; dto?: CreateReservationSeatDto } {
    const result = createReservationSeatSchema.safeParse(object);
    if (!result.success) {
      return { error: result.error.issues[0].message };
    }
    return { dto: new CreateReservationSeatDto(result.data) };
  }
}
