import { Response } from "express";
import { AuthenticatedRequest } from "../../../middlewares/ensureAuthenticated";
import { CustomError } from "../../../utils/customError";
import { FindOrdersByUserIdAndActiveUseCase } from "./findOrdersByUserIdAndActiveUseCase";

export class FindOrdersByUserIdAndActiveController {
  constructor(
    private findOrdersByUserIdAndActiveUseCase: FindOrdersByUserIdAndActiveUseCase
  ) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não encontrado." });
    }

    const result = await this.findOrdersByUserIdAndActiveUseCase.execute({
      userId,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json(result);
  }
}
