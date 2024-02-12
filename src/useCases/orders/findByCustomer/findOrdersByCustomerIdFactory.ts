import { PostgresCustomersRepository } from "../../../repositories/postgres/postgresCustomersRepository";
import { PostgresOrderItemsRepository } from "../../../repositories/postgres/postgresOrderItemsRepository";
import { PostgresOrdersRepository } from "../../../repositories/postgres/postgresOrdersRepository";
import { FindOrdersByCustomerIdController } from "./findOrdersByCustomerIdController";
import { FindOrdersByCustomerIdUseCase } from "./findOrdersByCustomerIdUseCase";

export const findOrdersByCustomerIdFactory = () => {
  const ordersRepository = new PostgresOrdersRepository();
  const orderItemsRepository = new PostgresOrderItemsRepository();
  const customersRepository = new PostgresCustomersRepository();
  const findOrdersByCustomerIdUseCase = new FindOrdersByCustomerIdUseCase(
    ordersRepository,
    orderItemsRepository,
    customersRepository
  );
  const findOrdersByCustomerIdController = new FindOrdersByCustomerIdController(
    findOrdersByCustomerIdUseCase
  );

  return findOrdersByCustomerIdController;
};
