import {
  CreateReservationInput,
  createReservationSchema,
} from "../../../shared/schemas/reservation.schema";

type Result = { success: true; dto: CreateReservationDto } | { success: false; error: string };

export class CreateReservationDto {
  private constructor(public readonly data: CreateReservationInput) {}

  static create(object: unknown): Result {
    const result = createReservationSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new CreateReservationDto(result.data) };
  }
}
