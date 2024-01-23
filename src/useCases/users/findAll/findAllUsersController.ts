import { Request, Response } from "express";
import { FindAllUsersUseCase } from "./findAllUsersUseCase";

export class FindAllUsersController {
  constructor(private findAllUsersUseCase: FindAllUsersUseCase) {}

  async handle(req: Request, res: Response) {
    const result = await this.findAllUsersUseCase.execute();

    return res.status(200).json(result);
  }
}
