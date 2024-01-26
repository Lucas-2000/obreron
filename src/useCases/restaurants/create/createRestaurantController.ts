import { Request, Response } from "express";
import { CreateRestaurantUseCase } from "./createRestaurantUseCase";
import { CustomError } from "../../../utils/customError";
import { AuthenticatedRequest } from "../../../middlewares/ensureAuthenticated";

export class CreateRestaurantController {
  constructor(private createRestaurantUseCase: CreateRestaurantUseCase) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não encontrado." });
    }

    const {
      name,
      address,
      phone,
      category,
      description,
      openingHour,
      closingHour,
    } = req.body;

    const result = await this.createRestaurantUseCase.execute({
      name,
      address,
      phone,
      category,
      description,
      openingHour,
      closingHour,
      userId,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json({ message: "Restaurante criado com sucesso!" });
  }
}
