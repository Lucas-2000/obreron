import { Request, Response } from "express";
import { CustomError } from "../../../utils/customError";
import { TotalAmountOnPeriodUseCase } from "./totalAmountOnPeriodUseCase";

export class TotalAmountOnPeriodController {
  constructor(private totalAmountOnPeriodUseCase: TotalAmountOnPeriodUseCase) {}

  async handle(req: Request, res: Response) {
    const { startDate, finalDate, restaurantId } = req.params;

    const result = await this.totalAmountOnPeriodUseCase.execute({
      startDate: new Date(startDate),
      finalDate: new Date(finalDate),
      restaurantId,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json(result);
  }
}
