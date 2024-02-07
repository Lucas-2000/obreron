import { Request, Response } from "express";
import { CustomError } from "../../../utils/customError";
import { DeleteCustomerUseCase } from "./deleteCustomerUseCase";

export class DeleteCustomerController {
  constructor(private deleteCustomerUseCase: DeleteCustomerUseCase) {}

  async handle(req: Request, res: Response) {
    const { id } = req.body;

    const result = await this.deleteCustomerUseCase.execute({
      id,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json({ message: "Cliente deletado com sucesso!" });
  }
}
