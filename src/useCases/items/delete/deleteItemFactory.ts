import { PostgresItemsRepository } from "./../../../repositories/postgres/postgresItemsRepository";
import { DeleteItemController } from "./deleteItemController";
import { DeleteItemUseCase } from "./deleteItemUseCase";

export const deleteItemFactory = () => {
  const itemsRepository = new PostgresItemsRepository();
  const deleteItemUseCase = new DeleteItemUseCase(itemsRepository);
  const deleteItemController = new DeleteItemController(deleteItemUseCase);

  return deleteItemController;
};
