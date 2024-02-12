import { FindOrdersByUserIdAndDeliveryStatusController } from "./findOrdersByUserIdAndDeliveryStatusController";
import { FindOrdersByUserIdAndDeliveryStatusUseCase } from "./findOrdersByUserIdAndDeliveryStatusUseCase";
import { PostgresOrderItemsRepository } from "../../../repositories/postgres/postgresOrderItemsRepository";
import { PostgresOrdersRepository } from "../../../repositories/postgres/postgresOrdersRepository";

export const findOrdersByUserIdAndDeliveryStatusFactory = () => {
  const ordersRepository = new PostgresOrdersRepository();
  const orderItemsRepository = new PostgresOrderItemsRepository();
  const findOrdersByUserIdAndDeliveryStatusUseCase =
    new FindOrdersByUserIdAndDeliveryStatusUseCase(
      ordersRepository,
      orderItemsRepository
    );
  const findOrdersByUserIdAndDeliveryStatusController =
    new FindOrdersByUserIdAndDeliveryStatusController(
      findOrdersByUserIdAndDeliveryStatusUseCase
    );

  return findOrdersByUserIdAndDeliveryStatusController;
};
