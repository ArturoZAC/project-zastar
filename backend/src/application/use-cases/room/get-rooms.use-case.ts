import { Room } from "../../../domain/entities/room.entity";
import { RoomRepository } from "../../../domain/repositories/room.repository";
import { NotFoundError } from "../../../shared/errors/not-found-error";
import { RoomFilters } from "../../../shared/schemas/room.schema";

export interface GetAllRoomsUseCase {
  execute(filters?: RoomFilters): Promise<Room[]>;
}

export class GetAllRooms implements GetAllRoomsUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  execute = async (filters?: RoomFilters): Promise<Room[]> => {
    return this.roomRepo.findAll(filters);
  };
}

export interface GetRoomByIdUseCase {
  execute(id: string): Promise<Room>;
}

export class GetRoomById implements GetRoomByIdUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  execute = async (id: string): Promise<Room> => {
    const room = await this.roomRepo.findById(id);
    if (!room) throw new NotFoundError("Room not found");
    return room;
  };
}
