import { Request, Response } from "express";
import { CustomError } from "../../../utils/customError";
import { FindOrdersByCustomerIdUseCase } from "./findOrdersByCustomerIdUseCase";

export class FindOrdersByCustomerIdController {
  constructor(
    private findOrdersByCustomerIdUseCase: FindOrdersByCustomerIdUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { customerId } = req.params;

    const result = await this.findOrdersByCustomerIdUseCase.execute({
      customerId,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json(result);
  }
}
