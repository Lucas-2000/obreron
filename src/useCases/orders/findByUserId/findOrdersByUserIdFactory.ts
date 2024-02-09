import { PostgresOrderItemsRepository } from "../../../repositories/postgres/postgresOrderItemsRepository";
import { PostgresOrdersRepository } from "../../../repositories/postgres/postgresOrdersRepository";
import { FindOrdersByUserIdController } from "./findOrdersByUserIdController";
import { FindOrdersByUserIdUseCase } from "./findOrdersByUserIdUseCase";

export const findOrdersByUserIdFactory = () => {
  const ordersRepository = new PostgresOrdersRepository();
  const orderItemsRepository = new PostgresOrderItemsRepository();
  const findOrdersByUserIdUseCase = new FindOrdersByUserIdUseCase(
    ordersRepository,
    orderItemsRepository
  );
  const findOrdersByUserIdController = new FindOrdersByUserIdController(
    findOrdersByUserIdUseCase
  );

  return findOrdersByUserIdController;
};
