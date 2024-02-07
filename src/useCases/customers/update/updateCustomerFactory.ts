import { PostgresCustomersRepository } from "./../../../repositories/postgres/postgresCustomersRepository";
import { UpdateCustomerController } from "./updateCustomerController";
import { UpdateCustomerUseCase } from "./updateCustomerUseCase";

export const updateCustomerFactory = () => {
  const customersRepository = new PostgresCustomersRepository();
  const updateCustomerUseCase = new UpdateCustomerUseCase(customersRepository);
  const updateCustomerController = new UpdateCustomerController(
    updateCustomerUseCase
  );

  return updateCustomerController;
};
