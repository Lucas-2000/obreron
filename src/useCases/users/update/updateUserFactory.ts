import { PostgresUserRepository } from "./../../../repositories/postgres/postgresUserRepository";
import { UpdateUserController } from "./updateUserController";
import { UpdateUserUseCase } from "./updateUserUseCase";

export const updateUserFactory = () => {
  const usersRepository = new PostgresUserRepository();
  const updateUserUseCase = new UpdateUserUseCase(usersRepository);
  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
};
