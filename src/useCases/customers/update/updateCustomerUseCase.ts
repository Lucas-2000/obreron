import { EnumCustomerGender } from "../../../entities/customer";
import { CustomersRepository } from "../../../repositories/customersRepository";
import { CustomError } from "../../../utils/customError";

interface UpdateCustomerRequest {
  id: string;
  name: string;
  birthDate: string;
  phone: string;
  address: string;
  email: string;
  gender: EnumCustomerGender;
  isActive: boolean;
  observation?: string;
}

type UpdateCustomerResponse =
  | {
      name: string;
      birthDate: string;
      phone: string;
      address: string;
      email: string;
      gender: EnumCustomerGender;
      isActive: boolean;
      observation?: string;
    }
  | CustomError;

export class UpdateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    id,
    name,
    birthDate,
    phone,
    address,
    email,
    gender,
    isActive,
    observation,
  }: UpdateCustomerRequest): Promise<UpdateCustomerResponse> {
    if (
      id.trim() === "" ||
      name.trim() === "" ||
      birthDate === null ||
      phone.trim() === "" ||
      address.trim() === "" ||
      email.trim() === "" ||
      isActive === null ||
      gender.trim() === ""
    )
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const customer = await this.customersRepository.findById(id);

    if (!customer) return new CustomError(false, "Cliente não encontrado", 404);

    const validGender: string[] = Object.values(EnumCustomerGender);

    if (!validGender.includes(gender))
      return new CustomError(false, "Gênero inválido", 404);

    const [day, month, year] = birthDate.split("/").map(Number);
    const formattedBirthDate = new Date(year, month - 1, day);

    await this.customersRepository.update({
      id,
      name,
      birthDate: formattedBirthDate,
      phone,
      address,
      email,
      gender,
      isActive,
      observation,
      userId: customer.userId,
    });

    return {
      name,
      birthDate,
      phone,
      address,
      email,
      gender,
      isActive,
      observation,
    };
  }
}
