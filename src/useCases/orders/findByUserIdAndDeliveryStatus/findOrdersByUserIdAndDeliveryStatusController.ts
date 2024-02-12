import { Response } from "express";
import { AuthenticatedRequest } from "../../../middlewares/ensureAuthenticated";
import { CustomError } from "../../../utils/customError";
import { FindOrdersByUserIdAndDeliveryStatusUseCase } from "./findOrdersByUserIdAndDeliveryStatusUseCase";
import { EnumDeliveryStatus } from "../../../entities/order";

export class FindOrdersByUserIdAndDeliveryStatusController {
  constructor(
    private findOrdersByUserIdAndDeliveryStatusUseCase: FindOrdersByUserIdAndDeliveryStatusUseCase
  ) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não encontrado." });
    }

    const { deliveryStatus } = req.params;

    const result =
      await this.findOrdersByUserIdAndDeliveryStatusUseCase.execute({
        userId,
        deliveryStatus: deliveryStatus as EnumDeliveryStatus,
      });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json(result);
  }
}
