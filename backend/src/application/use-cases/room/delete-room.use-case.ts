import { RoomRepository } from "../../../domain/repositories/room.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";

export interface DeleteRoomUseCase {
  execute(id: string): Promise<void>;
}

export class DeleteRoom implements DeleteRoomUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  execute = async (id: string): Promise<void> => {
    const existing = await this.roomRepo.findById(id);
    if (!existing) throw new NotFoundError("Room not found");
    await this.roomRepo.softDelete(id);
  };
}
