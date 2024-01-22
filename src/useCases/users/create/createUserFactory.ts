import { PostgresUserRepository } from "./../../../repositories/postgres/postgresUserRepository";
import { CreateUserController } from "./createUserController";
import { CreateUserUseCase } from "./createUserUseCase";

export const createUserFactory = () => {
  const usersRepository = new PostgresUserRepository();
  const createUserUseCase = new CreateUserUseCase(usersRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};
