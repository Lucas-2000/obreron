import { PostgresUserRepository } from "./../../../repositories/postgres/postgresUserRepository";
import { FindUserByIdController } from "./findUserByIdController";
import { FindUserByIdUseCase } from "./findUserByIdUseCase";

export const findUserByIdFactory = () => {
  const usersRepository = new PostgresUserRepository();
  const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository);
  const findUserByIdController = new FindUserByIdController(
    findUserByIdUseCase
  );

  return findUserByIdController;
};
