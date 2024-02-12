import { Request, Response } from "express";
import { CustomError } from "../../../utils/customError";
import { DeleteOrderUseCase } from "./deleteOrderUseCase";

export class DeleteOrderController {
  constructor(private deleteOrderUseCase: DeleteOrderUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const result = await this.deleteOrderUseCase.execute({
      id,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json({ message: "Pedido deletado com sucesso!" });
  }
}
