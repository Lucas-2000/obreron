import { Response } from "express";
import { AuthenticatedRequest } from "../../../middlewares/ensureAuthenticated";
import { CreateOrderUseCase } from "./createOrderUseCase";
import { CustomError } from "../../../utils/customError";

export class CreateOrderController {
  constructor(private createOrderUseCase: CreateOrderUseCase) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não encontrado." });
    }

    const {
      address,
      amount,
      paymentType,
      deliveryStatus,
      restaurantId,
      customerId,
      orderItems,
    } = req.body;

    const result = await this.createOrderUseCase.execute({
      address,
      amount,
      paymentType,
      deliveryStatus,
      userId,
      restaurantId,
      customerId,
      orderItems,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json({ message: "Pedido criado com sucesso!" });
  }
}
