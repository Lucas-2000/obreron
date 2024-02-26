import { PostgresStatisticsRepository } from "./../../../repositories/postgres/postgresStatisticsRepository";
import { PostgresRestaurantsRepository } from "./../../../repositories/postgres/postgresRestaurantsRepository";
import { TotalAmountController } from "./totalAmountController";
import { TotalAmountUseCase } from "./totalAmountUseCase";

export const totalAmountFactory = () => {
  const statisticsRepository = new PostgresStatisticsRepository();
  const restaurantsRepository = new PostgresRestaurantsRepository();
  const totalAmountUseCase = new TotalAmountUseCase(
    statisticsRepository,
    restaurantsRepository
  );
  const totalAmountController = new TotalAmountController(totalAmountUseCase);

  return totalAmountController;
};
