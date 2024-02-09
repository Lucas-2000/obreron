import { PostgresOrderItemsRepository } from "./../../../repositories/postgres/postgresOrderItemsRepository";
import { PostgresOrdersRepository } from "./../../../repositories/postgres/postgresOrdersRepository";
import { PostgresCustomersRepository } from "./../../../repositories/postgres/postgresCustomersRepository";
import { PostgresRestaurantsRepository } from "./../../../repositories/postgres/postgresRestaurantsRepository";
import { PostgresUserRepository } from "./../../../repositories/postgres/postgresUserRepository";
import { PostgresItemsRepository } from "./../../../repositories/postgres/postgresItemsRepository";
import { CreateOrderUseCase } from "../../orders/create/createOrderUseCase";
import { CreateOrderController } from "../../orders/create/createOrderController";

export const createOrderFactory = () => {
  const itemsRepository = new PostgresItemsRepository();
  const usersRepository = new PostgresUserRepository();
  const restaurantsRepository = new PostgresRestaurantsRepository();
  const customersRepository = new PostgresCustomersRepository();
  const ordersRepository = new PostgresOrdersRepository();
  const orderItemsRepository = new PostgresOrderItemsRepository();

  const createOrderUseCase = new CreateOrderUseCase(
    ordersRepository,
    usersRepository,
    restaurantsRepository,
    customersRepository,
    itemsRepository,
    orderItemsRepository
  );

  const createOrderController = new CreateOrderController(createOrderUseCase);

  return createOrderController;
};
