import { PostgresCustomersRepository } from "../../../repositories/postgres/postgresCustomersRepository";
import { PostgresUserRepository } from "../../../repositories/postgres/postgresUserRepository";
import { CreateCustomerController } from "./createCustomerController";
import { CreateCustomerUseCase } from "./createCustomerUseCase";

export const createCustomerFactory = () => {
  const customersRepository = new PostgresCustomersRepository();
  const usersRepository = new PostgresUserRepository();
  const createCustomerUseCase = new CreateCustomerUseCase(
    customersRepository,
    usersRepository
  );
  const createCustomerController = new CreateCustomerController(
    createCustomerUseCase
  );

  return createCustomerController;
};
