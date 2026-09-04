import { UpdateRoomInput, updateRoomSchema } from "../../../shared/schemas/room.schema";

type Result = { success: true; dto: UpdateRoomDto } | { success: false; error: string };

export class UpdateRoomDto {
  private constructor(public readonly data: UpdateRoomInput) {}

  static create(object: unknown): Result {
    const result = updateRoomSchema.safeParse(object);
    if (result.error) {
      return { success: false, error: result.error.issues[0].message };
    }
    return { success: true, dto: new UpdateRoomDto(result.data) };
  }
}
