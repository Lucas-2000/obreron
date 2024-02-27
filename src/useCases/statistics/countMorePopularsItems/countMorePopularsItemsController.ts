import { Request, Response } from "express";
import { CustomError } from "../../../utils/customError";
import { CountMorePopularsItemsUseCase } from "./countMorePopularsItemsUseCase";

export class CountMorePopularsItemsController {
  constructor(
    private countMorePopularsItemsUseCase: CountMorePopularsItemsUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { restaurantId } = req.params;

    const result = await this.countMorePopularsItemsUseCase.execute({
      restaurantId,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json({ productDeliveryData: result });
  }
}
