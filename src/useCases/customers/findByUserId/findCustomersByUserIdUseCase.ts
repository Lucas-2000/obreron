import { EnumCustomerGender } from "../../../entities/customer";
import { CustomersRepository } from "../../../repositories/customersRepository";
import { CustomError } from "../../../utils/customError";

interface FindCustomerByUserIdRequest {
  userId: string;
}

type FindCustomerByUserIdResponse =
  | {
      id: string;
      name: string;
      birthDate: Date;
      phone: string;
      address: string;
      email: string;
      gender: EnumCustomerGender;
      isActive: boolean;
      observation?: string;
    }[]
  | CustomError;

export class FindCustomersByUserIdUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    userId,
  }: FindCustomerByUserIdRequest): Promise<FindCustomerByUserIdResponse> {
    if (userId.trim() === "")
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const customers = await this.customersRepository.findByUserId(userId);

    if (!customers)
      return new CustomError(false, "Restaurante não encontrado", 404);

    const customerResponse = customers.map((customer) => {
      return {
        id: customer.id,
        name: customer.name,
        birthDate: customer.birthDate,
        phone: customer.phone,
        address: customer.address,
        email: customer.email,
        gender: customer.gender,
        isActive: customer.isActive,
        observation: customer.observation,
      };
    });

    return customerResponse;
  }
}
