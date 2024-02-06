import { Response } from "express";
import { AuthenticatedRequest } from "../../../middlewares/ensureAuthenticated";
import { CustomError } from "../../../utils/customError";
import { CreateCustomerUseCase } from "./createCustomerUseCase";

export class CreateCustomerController {
  constructor(private createCustomerUseCase: CreateCustomerUseCase) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não encontrado." });
    }

    const { name, birthDate, phone, address, email, gender, observation } =
      req.body;

    const result = await this.createCustomerUseCase.execute({
      name,
      birthDate,
      phone,
      address,
      email,
      gender,
      observation,
      userId,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json({ message: "Cliente criado com sucesso!" });
  }
}
