import { Request, Response } from "express";
import { UpdateCustomerUseCase } from "./updateCustomerUseCase";
import { CustomError } from "../../../utils/customError";

export class UpdateCustomerController {
  constructor(private updateCustomerUseCase: UpdateCustomerUseCase) {}

  async handle(req: Request, res: Response) {
    const {
      id,
      name,
      birthDate,
      phone,
      address,
      email,
      gender,
      isActive,
      observation,
    } = req.body;

    const result = await this.updateCustomerUseCase.execute({
      id,
      name,
      birthDate,
      phone,
      address,
      email,
      gender,
      isActive,
      observation,
    });

    if (result instanceof CustomError && result.success === false) {
      return res.status(result.statusCode).json({ error: result.message });
    }

    return res.status(200).json(result);
  }
}
