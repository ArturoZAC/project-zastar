import { AppError } from "./app-error";

export class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message || "Bad request", 400);
  }
}
