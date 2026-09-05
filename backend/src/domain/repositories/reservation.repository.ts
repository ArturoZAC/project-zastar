import {
  ReservationFilters,
  UpdateReservationInput,
} from "../../shared/schemas/reservation.schema";
import { Reservation } from "../entities/reservation.entity";

export interface CreateReservationData {
  functionId: string;
  ticketCode: string;
  totalPrice: number;
  guestEmail: string;
  guestName: string;
  guestPhone?: string;
}

export abstract class ReservationRepository {
  abstract findById(id: string): Promise<Reservation | null>;
  abstract findByTicketCode(ticketCode: string): Promise<Reservation | null>;
  abstract findAll(filters?: ReservationFilters): Promise<Reservation[]>;
  abstract create(data: CreateReservationData): Promise<Reservation>;
  abstract update(id: string, data: UpdateReservationInput): Promise<Reservation>;
}
