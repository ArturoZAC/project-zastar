import { LanguageType, RoomFormat } from "../enums";

//prettier-ignore
export interface Function {
  id          : string;
  movieId     : string;
  roomId      : string;
  format      : RoomFormat;
  language    : LanguageType;
  startTime   : Date;
  basePrice   : number;
  vipSurcharge: number;
  isActive    : boolean;
  createdAt   : Date;
  deletedAt?  :  Date;
}
