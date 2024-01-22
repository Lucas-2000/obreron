export class CustomError {
  success: boolean;
  message: string;
  statusCode: number;

  constructor(success: boolean, message: string, statusCode: number) {
    this.success = success;
    this.message = message;
    this.statusCode = statusCode;
  }
}
