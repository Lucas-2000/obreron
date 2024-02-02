import { Response } from "express";
import { AuthenticatedRequest } from "../../../middlewares/ensureAuthenticated";
import { CreateItemUseCase } from "./createItemUseCase";
import { CustomError } from "../../../utils/customError";

export class CreateItemController {
  constructor(private createItemUseCase: CreateItemUseCase) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não encontrado." });
    }

    const {
      name,
      description,
      priceInCents,
      available,
      preparationTime,
      ingredients,
    } = req.body;

    const result = await this.createItemUseCase.execute({
      name,
      description,
      priceInCents,
      available,
      preparationTime,
      ingredients,
      userId,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json({ message: "Item criado com sucesso!" });
  }
}
