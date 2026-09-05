import { UserRole } from "../enums";

//prettier-ignore
export interface User {
  id        : string;
  email     : string;
  password  : string;
  firstName : string;
  lastName  : string;
  role      : UserRole;
  isActive  : boolean;
  createdAt : Date;
  updatedAt : Date;
  deletedAt?: Date;
}
