import { Response } from "express";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export class ResponseHelper {
  static success<T>(res: Response, message: string, data: T, statusCode = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      message,
      data,
    };
    res.status(statusCode).json(response);
  }

  static created<T>(res: Response, message: string, data: T): void {
    ResponseHelper.success(res, message, data, 201);
  }

  static noContent(res: Response): void {
    res.status(204).send();
  }

  static error(res: Response, message: string, statusCode = 500): void {
    const response: ApiResponse<null> = {
      success: false,
      message,
      data: null,
    };
    res.status(statusCode).json(response);
  }
}
