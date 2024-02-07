import { PostgresCustomersRepository } from "./../../../repositories/postgres/postgresCustomersRepository";
import { DeleteCustomerController } from "./deleteCustomerController";
import { DeleteCustomerUseCase } from "./deleteCustomerUseCase";

export const deleteCustomerFactory = () => {
  const customersRepository = new PostgresCustomersRepository();
  const deleteCustomerUseCase = new DeleteCustomerUseCase(customersRepository);
  const deleteCustomerController = new DeleteCustomerController(
    deleteCustomerUseCase
  );

  return deleteCustomerController;
};
