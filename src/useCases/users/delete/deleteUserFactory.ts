import { PostgresUserRepository } from "./../../../repositories/postgres/postgresUserRepository";
import { DeleteUserController } from "./deleteUserController";
import { DeleteUserUseCase } from "./deleteUserUseCase";

export const deleteUserFactory = () => {
  const usersRepository = new PostgresUserRepository();
  const deleteUserUseCase = new DeleteUserUseCase(usersRepository);
  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController;
};
