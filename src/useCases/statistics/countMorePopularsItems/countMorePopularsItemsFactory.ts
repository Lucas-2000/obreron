import { PostgresStatisticsRepository } from "./../../../repositories/postgres/postgresStatisticsRepository";
import { PostgresRestaurantsRepository } from "./../../../repositories/postgres/postgresRestaurantsRepository";
import { CountMorePopularsItemsController } from "./countMorePopularsItemsController";
import { CountMorePopularsItemsUseCase } from "./countMorePopularsItemsUseCase";

export const countMorePopularsItemsFactory = () => {
  const statisticsRepository = new PostgresStatisticsRepository();
  const restaurantsRepository = new PostgresRestaurantsRepository();
  const countMorePopularsItemsUseCase = new CountMorePopularsItemsUseCase(
    statisticsRepository,
    restaurantsRepository
  );
  const countMorePopularsItemsController = new CountMorePopularsItemsController(
    countMorePopularsItemsUseCase
  );

  return countMorePopularsItemsController;
};
