import { Request, Response } from "express";
import { DeleteUserUseCase } from "./deleteUserUseCase";
import { CustomError } from "../../../utils/customError";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async handle(req: Request, res: Response) {
    const id = req.query.id as string | undefined;

    if (id === undefined || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Inválido ou ID faltante na query." });
    }

    const result = await this.deleteUserUseCase.execute({ id });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso!" });
  }
}
