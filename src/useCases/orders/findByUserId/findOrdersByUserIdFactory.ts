import { PostgresCustomersRepository } from "./../../../repositories/postgres/postgresCustomersRepository";
import { PostgresOrderItemsRepository } from "../../../repositories/postgres/postgresOrderItemsRepository";
import { PostgresOrdersRepository } from "../../../repositories/postgres/postgresOrdersRepository";
import { FindOrdersByUserIdController } from "./findOrdersByUserIdController";
import { FindOrdersByUserIdUseCase } from "./findOrdersByUserIdUseCase";

export const findOrdersByUserIdFactory = () => {
  const ordersRepository = new PostgresOrdersRepository();
  const orderItemsRepository = new PostgresOrderItemsRepository();
  const customersRepository = new PostgresCustomersRepository();
  const findOrdersByUserIdUseCase = new FindOrdersByUserIdUseCase(
    ordersRepository,
    orderItemsRepository,
    customersRepository
  );
  const findOrdersByUserIdController = new FindOrdersByUserIdController(
    findOrdersByUserIdUseCase
  );

  return findOrdersByUserIdController;
};
