import { SeatTier } from "../enums";

//prettier-ignore
export interface Seat {
  id        : string;
  roomId    : string;
  row       : string;
  number    : number;
  tier      : SeatTier;
  isActive  : boolean;
  createdAt : Date;
  updatedAt : Date;
}
