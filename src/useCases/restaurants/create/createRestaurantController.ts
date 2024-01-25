import { Request, Response } from "express";
import { CreateRestaurantUseCase } from "./createRestaurantUseCase";
import { CustomError } from "../../../utils/customError";

export class CreateRestaurantController {
  constructor(private createRestaurantUseCase: CreateRestaurantUseCase) {}

  async handle(req: Request, res: Response) {
    const {
      name,
      address,
      phone,
      category,
      description,
      openingHour,
      closingHour,
      userId,
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
