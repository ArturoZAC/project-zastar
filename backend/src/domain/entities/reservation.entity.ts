import { ReservationStatus } from "../enums";

//prettier-ignore
export interface Reservation {
  id            : string;
  functionId    : string;
  guestEmail?   : string;
  guestName?    : string;
  guestPhone?   : string;
  ticketCode    : string;
  totalPrice    : number;
  status        : ReservationStatus;
  createdAt     : Date;
  updatedAt     : Date;
  expiresAt?    : Date;
}
