import { Request, Response } from "express";
import { DeleteUserUseCase } from "./deleteUserUseCase";
import { CustomError } from "../../../utils/customError";
import { AuthenticatedRequest } from "../../../middlewares/ensureAuthenticated";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const id = req.userId;

    if (!id) {
      return res.status(400).json({ error: "ID do usuário não encontrado." });
    }

    const result = await this.deleteUserUseCase.execute({ id });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso!" });
  }
}
