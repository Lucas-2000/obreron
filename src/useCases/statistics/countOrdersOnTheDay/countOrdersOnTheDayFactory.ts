import { PostgresStatisticsRepository } from "./../../../repositories/postgres/postgresStatisticsRepository";
import { PostgresRestaurantsRepository } from "./../../../repositories/postgres/postgresRestaurantsRepository";
import { CountOrdersOnTheDayController } from "./countOrdersOnTheDayController";
import { CountOrdersOnTheDayUseCase } from "./countOrdersOnTheDayUseCase";

export const countOrdersOnTheDayFactory = () => {
  const statisticsRepository = new PostgresStatisticsRepository();
  const restaurantsRepository = new PostgresRestaurantsRepository();
  const countOrdersOnTheDayUseCase = new CountOrdersOnTheDayUseCase(
    statisticsRepository,
    restaurantsRepository
  );
  const countOrdersOnTheDayController = new CountOrdersOnTheDayController(
    countOrdersOnTheDayUseCase
  );

  return countOrdersOnTheDayController;
};
