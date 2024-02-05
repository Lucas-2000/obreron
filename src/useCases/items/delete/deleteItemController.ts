import { Request, Response } from "express";
import { CustomError } from "../../../utils/customError";
import { DeleteItemUseCase } from "./deleteItemUseCase";

export class DeleteItemController {
  constructor(private deleteItemUseCase: DeleteItemUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const result = await this.deleteItemUseCase.execute({
      id,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json({ message: "Item deletado com sucesso!" });
  }
}
