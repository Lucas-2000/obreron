import { PostgresItemsRepository } from "../../../repositories/postgres/postgresItemsRepository";
import { PostgresUserRepository } from "../../../repositories/postgres/postgresUserRepository";
import { CreateItemController } from "./createItemController";
import { CreateItemUseCase } from "./createItemUseCase";

export const createItemFactory = () => {
  const itemsRepository = new PostgresItemsRepository();
  const usersRepository = new PostgresUserRepository();
  const createItemUseCase = new CreateItemUseCase(
    itemsRepository,
    usersRepository
  );
  const createItemController = new CreateItemController(createItemUseCase);

  return createItemController;
};
