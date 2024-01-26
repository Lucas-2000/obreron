import { Request, Response } from "express";
import { FindRestaurantByUserIdUseCase } from "./findRestaurantByUserIdUseCase";
import { CustomError } from "../../../utils/customError";
import { AuthenticatedRequest } from "../../../middlewares/ensureAuthenticated";

export class FindRestaurantByUserIdController {
  constructor(
    private findRestaurantByUserIdUseCase: FindRestaurantByUserIdUseCase
  ) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não encontrado." });
    }

    const result = await this.findRestaurantByUserIdUseCase.execute({ userId });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json(result);
  }
}
