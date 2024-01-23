import { Request, Response } from "express";
import { FindUserByIdUseCase } from "./findUserByIdUseCase";
import { CustomError } from "../../../utils/customError";

export class FindUserByIdController {
  constructor(private findUserByIdUseCase: FindUserByIdUseCase) {}

  async handle(req: Request, res: Response) {
    const id = req.query.id as string | undefined;

    if (id === undefined || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Inválido ou ID faltante na query." });
    }

    const result = await this.findUserByIdUseCase.execute({ id });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json(result);
  }
}
