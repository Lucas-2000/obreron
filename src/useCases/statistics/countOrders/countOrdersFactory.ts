import { PostgresStatisticsRepository } from "./../../../repositories/postgres/postgresStatisticsRepository";
import { PostgresRestaurantsRepository } from "./../../../repositories/postgres/postgresRestaurantsRepository";
import { CountOrdersController } from "./countOrdersController";
import { CountOrdersUseCase } from "./countOrdersUseCase";

export const countOrdersFactory = () => {
  const statisticsRepository = new PostgresStatisticsRepository();
  const restaurantsRepository = new PostgresRestaurantsRepository();
  const countOrdersUseCase = new CountOrdersUseCase(
    statisticsRepository,
    restaurantsRepository
  );
  const countOrdersController = new CountOrdersController(countOrdersUseCase);

  return countOrdersController;
};
