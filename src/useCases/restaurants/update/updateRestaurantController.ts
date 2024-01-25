import { Request, Response } from "express";
import { UpdateRestaurantUseCase } from "./updateRestaurantUseCase";
import { CustomError } from "../../../utils/customError";

export class UpdateRestaurantController {
  constructor(private updateRestaurantUseCase: UpdateRestaurantUseCase) {}

  async handle(req: Request, res: Response) {
    const {
      id,
      name,
      address,
      phone,
      category,
      description,
      openingHour,
      closingHour,
    } = req.body;

    const result = await this.updateRestaurantUseCase.execute({
      id,
      name,
      address,
      phone,
      category,
      description,
      openingHour,
      closingHour,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json(result);
  }
}
