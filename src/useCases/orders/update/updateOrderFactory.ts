import { PostgresOrderItemsRepository } from "./../../../repositories/postgres/postgresOrderItemsRepository";
import { PostgresOrdersRepository } from "./../../../repositories/postgres/postgresOrdersRepository";
import { PostgresCustomersRepository } from "./../../../repositories/postgres/postgresCustomersRepository";
import { PostgresItemsRepository } from "./../../../repositories/postgres/postgresItemsRepository";
import { UpdateOrderUseCase } from "./updateOrderUseCase";
import { UpdateOrderController } from "./updateOrderController";

export const updateOrderFactory = () => {
  const itemsRepository = new PostgresItemsRepository();
  const customersRepository = new PostgresCustomersRepository();
  const ordersRepository = new PostgresOrdersRepository();
  const orderItemsRepository = new PostgresOrderItemsRepository();

  const updateOrderUseCase = new UpdateOrderUseCase(
    ordersRepository,
    orderItemsRepository,
    customersRepository,
    itemsRepository
  );

  const updateOrderController = new UpdateOrderController(updateOrderUseCase);

  return updateOrderController;
};
