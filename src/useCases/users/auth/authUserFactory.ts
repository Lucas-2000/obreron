import { PostgresUserRepository } from "./../../../repositories/postgres/postgresUserRepository";
import { AuthUserController } from "./authUserController";
import { AuthUserUseCase } from "./authUserUseCase";

export const authUserFactory = () => {
  const usersRepository = new PostgresUserRepository();
  const authUserUseCase = new AuthUserUseCase(usersRepository);
  const authUserController = new AuthUserController(authUserUseCase);

  return authUserController;
};
