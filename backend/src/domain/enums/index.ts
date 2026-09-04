export enum UserRole {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export enum RoomFormat {
  TWO_D = "2D",
  THREE_D = "3D",
}

export enum SeatTier {
  STANDARD = "STANDARD",
  VIP = "VIP",
}

export enum AgeRatingType {
  APT = "APT",
  FOURTEEN_PLUS = "14+",
  EIGHTEEN_PLUS = "18+",
}

export enum LanguageType {
  SUBTITULADA = "SUBTITULADA",
  DOBLADA = "DOBLADA",
}

export enum ReservationStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum PaymentProvider {
  IZIPAY = "IZIPAY",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
