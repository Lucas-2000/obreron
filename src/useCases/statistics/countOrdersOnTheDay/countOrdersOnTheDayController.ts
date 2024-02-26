import { Request, Response } from "express";
import { CustomError } from "../../../utils/customError";
import { CountOrdersOnTheDayUseCase } from "./countOrdersOnTheDayUseCase";

export class CountOrdersOnTheDayController {
  constructor(private countOrdersOnTheDayUseCase: CountOrdersOnTheDayUseCase) {}

  async handle(req: Request, res: Response) {
    const { restaurantId } = req.params;

    const result = await this.countOrdersOnTheDayUseCase.execute({
      restaurantId,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json(result);
  }
}
