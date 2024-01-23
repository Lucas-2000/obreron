import { PostgresUserRepository } from "./../../../repositories/postgres/postgresUserRepository";
import { FindAllUsersController } from "./findAllUsersController";
import { FindAllUsersUseCase } from "./findAllUsersUseCase";

export const findAllUsersFactory = () => {
  const usersRepository = new PostgresUserRepository();
  const findAllUsersUseCase = new FindAllUsersUseCase(usersRepository);
  const findAllUsersController = new FindAllUsersController(
    findAllUsersUseCase
  );

  return findAllUsersController;
};
