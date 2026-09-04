import { Seat } from '../entities/seat.entity';
import { CreateSeatInput } from '../../shared/schemas/seat.schema';

export abstract class SeatRepository {
  abstract findById(id: string): Promise<Seat | null>;
  abstract findByRoomId(roomId: string): Promise<Seat[]>;
  abstract createMany(data: CreateSeatInput[]): Promise<Seat[]>;
  abstract deleteByRoomId(roomId: string): Promise<void>;
}
