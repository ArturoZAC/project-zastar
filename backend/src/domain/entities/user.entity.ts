import { UserRole } from "../enums";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
