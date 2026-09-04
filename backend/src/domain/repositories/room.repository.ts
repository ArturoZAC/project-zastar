import { Room } from '../entities/room.entity';
import { CreateRoomInput, RoomFilters, UpdateRoomInput } from '../../shared/schemas/room.schema';

export abstract class RoomRepository {
  abstract findById(id: string): Promise<Room | null>;
  abstract findByName(name: string): Promise<Room | null>;
  abstract findAll(filters?: RoomFilters): Promise<Room[]>;
  abstract create(data: CreateRoomInput): Promise<Room>;
  abstract update(id: string, data: UpdateRoomInput): Promise<Room>;
  abstract softDelete(id: string): Promise<void>;
}
