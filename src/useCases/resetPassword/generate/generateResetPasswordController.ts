import { Request, Response } from "express";
import { GenerateResetPasswordUseCase } from "./generateResetPasswordUseCase";
import { CustomError } from "../../../utils/customError";

export class GenerateResetPasswordController {
  constructor(
    private generateResetPasswordUseCase: GenerateResetPasswordUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { userId } = req.body;

    const result = await this.generateResetPasswordUseCase.execute({ userId });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json(result);
  }
}
