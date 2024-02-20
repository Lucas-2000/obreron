import { FindOrdersByUserIdAndActiveController } from "./findOrdersByUserIdAndActiveController";
import { FindOrdersByUserIdAndActiveUseCase } from "./findOrdersByUserIdAndActiveUseCase";
import { PostgresOrderItemsRepository } from "../../../repositories/postgres/postgresOrderItemsRepository";
import { PostgresOrdersRepository } from "../../../repositories/postgres/postgresOrdersRepository";
import { PostgresCustomersRepository } from "../../../repositories/postgres/postgresCustomersRepository";

export const findOrdersByUserIdAndActiveFactory = () => {
  const ordersRepository = new PostgresOrdersRepository();
  const orderItemsRepository = new PostgresOrderItemsRepository();
  const customersRepository = new PostgresCustomersRepository();
  const findOrdersByUserIdAndActiveUseCase =
    new FindOrdersByUserIdAndActiveUseCase(
      ordersRepository,
      orderItemsRepository,
      customersRepository
    );
  const findOrdersByUserIdAndActiveController =
    new FindOrdersByUserIdAndActiveController(
      findOrdersByUserIdAndActiveUseCase
    );

  return findOrdersByUserIdAndActiveController;
};
