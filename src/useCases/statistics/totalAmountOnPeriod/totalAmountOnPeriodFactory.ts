import { PostgresStatisticsRepository } from "./../../../repositories/postgres/postgresStatisticsRepository";
import { PostgresRestaurantsRepository } from "./../../../repositories/postgres/postgresRestaurantsRepository";
import { TotalAmountOnPeriodController } from "./totalAmountOnPeriodController";
import { TotalAmountOnPeriodUseCase } from "./totalAmountOnPeriodUseCase";

export const totalAmountOnPeriodFactory = () => {
  const statisticsRepository = new PostgresStatisticsRepository();
  const restaurantsRepository = new PostgresRestaurantsRepository();
  const totalAmountOnPeriodUseCase = new TotalAmountOnPeriodUseCase(
    statisticsRepository,
    restaurantsRepository
  );
  const totalAmountOnPeriodController = new TotalAmountOnPeriodController(
    totalAmountOnPeriodUseCase
  );

  return totalAmountOnPeriodController;
};
