import { Request, Response } from "express";
import { CreateUserUseCase } from "./createUserUseCase";
import { CustomError } from "../../../utils/customError";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { username, email, password, rePassword } = req.body;

    const result = await this.createUserUseCase.execute({
      username,
      email,
      password,
      rePassword,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  }
}
