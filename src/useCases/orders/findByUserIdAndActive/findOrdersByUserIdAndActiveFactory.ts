import { FindOrdersByUserIdAndActiveController } from "./findOrdersByUserIdAndActiveController";
import { FindOrdersByUserIdAndActiveUseCase } from "./findOrdersByUserIdAndActiveUseCase";
import { PostgresOrderItemsRepository } from "../../../repositories/postgres/postgresOrderItemsRepository";
import { PostgresOrdersRepository } from "../../../repositories/postgres/postgresOrdersRepository";

export const findOrdersByUserIdAndActiveFactory = () => {
  const ordersRepository = new PostgresOrdersRepository();
  const orderItemsRepository = new PostgresOrderItemsRepository();
  const findOrdersByUserIdAndActiveUseCase =
    new FindOrdersByUserIdAndActiveUseCase(
      ordersRepository,
      orderItemsRepository
    );
  const findOrdersByUserIdAndActiveController =
    new FindOrdersByUserIdAndActiveController(
      findOrdersByUserIdAndActiveUseCase
    );

  return findOrdersByUserIdAndActiveController;
};
