import { RoomFormat } from "../enums";

//prettier-ignore
export interface Room {
  id          : string;
  name        : string;
  format      : RoomFormat;
  totalSeats  : number;
  isActive    : boolean;
  createdAt   : Date;
  updatedAt   : Date;
  deletedAt?  : Date;
}
