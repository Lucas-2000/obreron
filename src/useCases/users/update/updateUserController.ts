import { Request, Response } from "express";
import { UpdateUserUseCase } from "./updateUserUseCase";
import { CustomError } from "../../../utils/customError";
import { AuthenticatedRequest } from "../../../middlewares/ensureAuthenticated";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const id = req.userId;

    if (!id) {
      return res.status(400).json({ error: "ID do usuário não encontrado." });
    }

    const { password, rePassword } = req.body;

    const result = await this.updateUserUseCase.execute({
      id,
      password,
      rePassword,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json(result);
  }
}
