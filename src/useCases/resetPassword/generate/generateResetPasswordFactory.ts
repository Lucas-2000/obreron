import { PostgresResetPasswordRepository } from "./../../../repositories/postgres/postgresResetPasswordRepository";
import { PostgresUserRepository } from "./../../../repositories/postgres/postgresUserRepository";
import { GenerateResetPasswordController } from "./generateResetPasswordController";
import { GenerateResetPasswordUseCase } from "./generateResetPasswordUseCase";

export const generateResetPasswordFactory = () => {
  const resetPasswordRepository = new PostgresResetPasswordRepository();
  const usersRepository = new PostgresUserRepository();

  const generateResetPasswordUseCase = new GenerateResetPasswordUseCase(
    resetPasswordRepository,
    usersRepository
  );

  const generateResetPasswordController = new GenerateResetPasswordController(
    generateResetPasswordUseCase
  );

  return generateResetPasswordController;
};
