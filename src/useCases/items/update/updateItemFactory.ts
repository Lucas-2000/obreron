import { UpdateItemController } from "./updateItemController";
import { PostgresItemsRepository } from "./../../../repositories/postgres/postgresItemsRepository";
import { UpdateItemUseCase } from "./updateItemUseCase";

export const updateItemFactory = () => {
  const itemsRepository = new PostgresItemsRepository();
  const updateItemUseCase = new UpdateItemUseCase(itemsRepository);
  const updateItemController = new UpdateItemController(updateItemUseCase);

  return updateItemController;
};
