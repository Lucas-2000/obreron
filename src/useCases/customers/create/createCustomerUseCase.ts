import { CustomersRepository } from "./../../../repositories/customersRepository";
import { Customer, EnumCustomerGender } from "../../../entities/customer";
import { CustomError } from "../../../utils/customError";
import { UsersRepository } from "../../../repositories/usersRepository";

interface CreateCustomerRequest {
  name: string;
  birthDate: string;
  phone: string;
  address: string;
  email: string;
  gender: EnumCustomerGender;
  observation?: string;
  userId: string;
}

type CreateCustomerResponse = void | CustomError;

export class CreateCustomerUseCase {
  constructor(
    private customersRepository: CustomersRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    birthDate,
    phone,
    address,
    email,
    gender,
    observation,
    userId,
  }: CreateCustomerRequest): Promise<CreateCustomerResponse> {
    if (
      name.trim() === "" ||
      birthDate === null ||
      phone.trim() === "" ||
      address === null ||
      email === null ||
      gender.trim() === "" ||
      userId.trim() === ""
    )
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists)
      return new CustomError(false, "Usuário não encontrado", 404);

    const validGender: string[] = Object.values(EnumCustomerGender);

    if (!validGender.includes(gender))
      return new CustomError(false, "Gênero inválido", 404);

    const [day, month, year] = birthDate.split("/").map(Number);
    const formattedBirthDate = new Date(year, month - 1, day);

    const customer = new Customer(userId);
    customer.name = name;
    customer.birthDate = formattedBirthDate;
    customer.phone = phone;
    customer.address = address;
    customer.email = email;
    customer.gender = gender;
    customer.observation = observation;

    await this.customersRepository.create(customer);
  }
}
