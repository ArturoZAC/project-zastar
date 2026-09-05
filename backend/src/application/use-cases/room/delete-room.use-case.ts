import { RoomRepository } from "../../../domain/repositories/room.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export class DeleteRoomUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async execute(id: string) {
    const existing = await this.roomRepo.findById(id);
    if (!existing) {
      throw new NotFoundError("Room not found");
    }

    await this.roomRepo.softDelete(id);
  }
}
