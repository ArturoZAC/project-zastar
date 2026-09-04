import { ReservationStatus } from '../enums';

export interface Reservation {
  id: string;
  ticketCode: string;
  userId?: string;
  guestFullName?: string;
  guestEmail?: string;
  guestPhone?: string;
  functionId: string;
  status: ReservationStatus;
  totalAmount: number;
  expiresAt: Date;
  createdAt: Date;
  confirmedAt?: Date;
}
