import { SeatTier } from "../enums";

export interface Seat {
  id: string;
  roomId: string;
  row: string;
  column: number;
  tier: SeatTier;
}
