import { PostgresOrdersRepository } from "./../../../repositories/postgres/postgresOrdersRepository";
import { DeleteOrderController } from "./deleteOrderController";
import { DeleteOrderUseCase } from "./deleteOrderUseCase";

export const deleteOrderFactory = () => {
  const ordersRepository = new PostgresOrdersRepository();
  const deleteOrderUseCase = new DeleteOrderUseCase(ordersRepository);
  const deleteOrderController = new DeleteOrderController(deleteOrderUseCase);

  return deleteOrderController;
};
