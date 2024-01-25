import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/customError";

export const errorHandler = (
  err: CustomError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError && err.success === false) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  const internalErrorResponse = new CustomError(false, "Erro interno", 500);
  return res.status(500).json(internalErrorResponse);
};
