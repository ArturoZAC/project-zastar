export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export class ResponseHelper {
  static success<T>(message: string, data: T): ApiResponse<T> {
    return { success: true, message, data };
  }

  static created<T>(message: string, data: T): ApiResponse<T> {
    return { success: true, message, data };
  }

  static error(message: string, errors?: Record<string, string[]>): ApiResponse<null> {
    return { success: false, message, errors };
  }
}
