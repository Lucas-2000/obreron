import { Request, Response } from "express";
import { UpdateItemUseCase } from "./updateItemUseCase";
import { CustomError } from "../../../utils/customError";

export class UpdateItemController {
  constructor(private updateItemUseCase: UpdateItemUseCase) {}

  async handle(req: Request, res: Response) {
    const {
      id,
      name,
      description,
      priceInCents,
      available,
      preparationTime,
      ingredients,
    } = req.body;

    const result = await this.updateItemUseCase.execute({
      id,
      name,
      description,
      priceInCents,
      available,
      preparationTime,
      ingredients,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json(result);
  }
}
