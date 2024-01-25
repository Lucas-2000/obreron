import { PostgresRestaurantsRepository } from "./../../../repositories/postgres/postgresRestaurantsRepository";
import { UpdateRestaurantController } from "./updateRestaurantController";
import { UpdateRestaurantUseCase } from "./updateRestaurantUseCase";

export const updateRestaurantFactory = () => {
  const restaurantsRepository = new PostgresRestaurantsRepository();
  const updateRestaurantUseCase = new UpdateRestaurantUseCase(
    restaurantsRepository
  );
  const updateRestaurantController = new UpdateRestaurantController(
    updateRestaurantUseCase
  );

  return updateRestaurantController;
};
