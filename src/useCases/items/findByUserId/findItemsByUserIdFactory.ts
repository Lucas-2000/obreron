import { PostgresItemsRepository } from "../../../repositories/postgres/postgresItemsRepository";
import { FindItemsByUserIdController } from "./findItemsByUserIdController";
import { FindItemsByUserIdUseCase } from "./findItemsByUserIdUseCase";

export const findItemsByUserIdFactory = () => {
  const itemsRepository = new PostgresItemsRepository();
  const findItemsByUserIdUseCase = new FindItemsByUserIdUseCase(
    itemsRepository
  );
  const findItemsByUserIdController = new FindItemsByUserIdController(
    findItemsByUserIdUseCase
  );

  return findItemsByUserIdController;
};
