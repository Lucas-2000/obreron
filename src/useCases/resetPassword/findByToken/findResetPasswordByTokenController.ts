import { Request, Response } from "express";
import { FindResetPasswordByTokenUseCase } from "./findResetPasswordByTokenUseCase";
import { CustomError } from "../../../utils/customError";

export class FindResetPasswordByTokenController {
  constructor(
    private findResetPasswordByTokenUseCase: FindResetPasswordByTokenUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const token = req.query.token as string | undefined;

    if (token === undefined || typeof token !== "string") {
      return res
        .status(400)
        .json({ error: "Inválido ou Token faltante na query." });
    }

    const result = await this.findResetPasswordByTokenUseCase.execute({
      token,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json(result);
  }
}
