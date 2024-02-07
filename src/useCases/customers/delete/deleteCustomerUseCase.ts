import { CustomersRepository } from "../../../repositories/customersRepository";
import { CustomError } from "../../../utils/customError";

interface DeleteCustomerRequest {
  id: string;
}

type DeleteCustomerResponse = void | CustomError;

export class DeleteCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    id,
  }: DeleteCustomerRequest): Promise<DeleteCustomerResponse> {
    if (id.trim() === "")
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const customerExists = await this.customersRepository.findById(id);

    if (!customerExists)
      return new CustomError(false, "Cliente não encontrado", 404);

    await this.customersRepository.delete(id);
  }
}
