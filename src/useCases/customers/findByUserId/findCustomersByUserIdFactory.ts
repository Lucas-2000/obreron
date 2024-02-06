import { FindCustomersByUserIdController } from "./findCustomersByUserIdController";
import { FindCustomersByUserIdUseCase } from "./findCustomersByUserIdUseCase";
import { PostgresCustomersRepository } from "../../../repositories/postgres/postgresCustomersRepository";

export const findCustomersByUserIdFactory = () => {
  const customersRepository = new PostgresCustomersRepository();
  const findCustomersByUserIdUseCase = new FindCustomersByUserIdUseCase(
    customersRepository
  );
  const findCustomersByUserIdController = new FindCustomersByUserIdController(
    findCustomersByUserIdUseCase
  );

  return findCustomersByUserIdController;
};
