import { Request, Response } from "express";
import { AuthUserUseCase } from "./authUserUseCase";
import { CustomError } from "../../../utils/customError";

export class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const result = await this.authUserUseCase.execute({
      username,
      password,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json(result);
  }
}
