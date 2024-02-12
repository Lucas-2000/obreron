import { Request, Response } from "express";
import { CustomError } from "../../../utils/customError";
import { UpdateOrderUseCase } from "./updateOrderUseCase";

export class UpdateOrderController {
  constructor(private updateOrderUseCase: UpdateOrderUseCase) {}

  async handle(req: Request, res: Response) {
    const { id, address, paymentType, deliveryStatus, customerId, orderItems } =
      req.body;

    const result = await this.updateOrderUseCase.execute({
      id,
      address,
      paymentType,
      deliveryStatus,
      customerId,
      orderItems,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json(result);
  }
}
