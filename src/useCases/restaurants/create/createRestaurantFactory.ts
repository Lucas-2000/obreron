import { PostgresUserRepository } from "../../../repositories/postgres/postgresUserRepository";
import { PostgresRestaurantsRepository } from "./../../../repositories/postgres/postgresRestaurantsRepository";
import { CreateRestaurantController } from "./createRestaurantController";
import { CreateRestaurantUseCase } from "./createRestaurantUseCase";

export const createRestaurantFactory = () => {
  const restaurantsRepository = new PostgresRestaurantsRepository();
  const usersRepository = new PostgresUserRepository();
  const createRestaurantUseCase = new CreateRestaurantUseCase(
    restaurantsRepository,
    usersRepository
  );
  const createRestaurantController = new CreateRestaurantController(
    createRestaurantUseCase
  );

  return createRestaurantController;
};
