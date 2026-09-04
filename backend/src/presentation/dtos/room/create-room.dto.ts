import {
  createRoomSchema,
  CreateRoomInput,
} from "../../../shared/schemas/room.schema";

type Result =
  | { success: true; dto: CreateRoomDto }
  | { success: false; error: string };

export class CreateRoomDto {
  private constructor(public readonly data: CreateRoomInput) {}

  static create(object: unknown): Result {
    const result = createRoomSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new CreateRoomDto(result.data) };
  }
}
