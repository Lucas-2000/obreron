import { Request, Response } from "express";
import { FindRestaurantByUserIdUseCase } from "./findRestaurantByUserIdUseCase";
import { CustomError } from "../../../utils/customError";

export class FindRestaurantByUserIdController {
  constructor(
    private findRestaurantByUserIdUseCase: FindRestaurantByUserIdUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const userId = req.query.userId as string | undefined;

    if (userId === undefined || typeof userId !== "string") {
      return res
        .status(400)
        .json({ error: "Inválido ou ID faltante na query." });
    }

    const result = await this.findRestaurantByUserIdUseCase.execute({ userId });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json(result);
  }
}
