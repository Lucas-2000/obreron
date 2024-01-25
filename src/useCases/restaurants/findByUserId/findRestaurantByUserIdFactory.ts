import { PostgresRestaurantsRepository } from "./../../../repositories/postgres/postgresRestaurantsRepository";
import { FindRestaurantByUserIdController } from "./findRestaurantByUserIdController";
import { FindRestaurantByUserIdUseCase } from "./findRestaurantByUserIdUseCase";

export const FindRestaurantByUserIdFactory = () => {
  const restaurantsRepository = new PostgresRestaurantsRepository();
  const findRestaurantByUserIdUseCase = new FindRestaurantByUserIdUseCase(
    restaurantsRepository
  );
  const findRestaurantByUserIdController = new FindRestaurantByUserIdController(
    findRestaurantByUserIdUseCase
  );

  return findRestaurantByUserIdController;
};
