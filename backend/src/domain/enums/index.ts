export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export enum RoomFormat {
  TWO_D = "2D",
  THREE_D = "3D",
  IMAX = "IMAX",
  FOUR_DX = "4DX",
}

export enum SeatTier {
  STANDARD = "standard",
  VIP = "vip",
  PREMIUM = "premium",
}

export enum AgeRatingType {
  G = "G",
  PG = "PG",
  PG13 = "PG13",
  R = "R",
  NC17 = "NC17",
}

export enum LanguageType {
  SUBTITLED = "subtitled",
  DUBBED = "dubbed",
  ORIGINAL = "original",
}

export enum ReservationStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
  EXPIRED = "expired",
}

export enum PaymentProvider {
  CULQI = "culqi",
  IZIPAY = "izipay",
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
}
