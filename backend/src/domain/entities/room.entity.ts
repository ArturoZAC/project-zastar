import { RoomFormat } from '../enums';

export interface Room {
  id: string;
  name: string;
  defaultFormat: RoomFormat;
  rows: number;
  columns: number;
  isActive: boolean;
  deletedAt?: Date;
}
