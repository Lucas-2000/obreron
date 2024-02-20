import { FindOrdersByUserIdAndDeliveryStatusController } from "./findOrdersByUserIdAndDeliveryStatusController";
import { FindOrdersByUserIdAndDeliveryStatusUseCase } from "./findOrdersByUserIdAndDeliveryStatusUseCase";
import { PostgresOrderItemsRepository } from "../../../repositories/postgres/postgresOrderItemsRepository";
import { PostgresOrdersRepository } from "../../../repositories/postgres/postgresOrdersRepository";
import { PostgresCustomersRepository } from "../../../repositories/postgres/postgresCustomersRepository";

export const findOrdersByUserIdAndDeliveryStatusFactory = () => {
  const ordersRepository = new PostgresOrdersRepository();
  const orderItemsRepository = new PostgresOrderItemsRepository();
  const customersRepository = new PostgresCustomersRepository();
  const findOrdersByUserIdAndDeliveryStatusUseCase =
    new FindOrdersByUserIdAndDeliveryStatusUseCase(
      ordersRepository,
      orderItemsRepository,
      customersRepository
    );
  const findOrdersByUserIdAndDeliveryStatusController =
    new FindOrdersByUserIdAndDeliveryStatusController(
      findOrdersByUserIdAndDeliveryStatusUseCase
    );

  return findOrdersByUserIdAndDeliveryStatusController;
};
