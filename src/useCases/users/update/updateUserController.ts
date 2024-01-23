import { Request, Response } from "express";
import { UpdateUserUseCase } from "./updateUserUseCase";
import { CustomError } from "../../../utils/customError";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { id, password, rePassword } = req.body;

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
