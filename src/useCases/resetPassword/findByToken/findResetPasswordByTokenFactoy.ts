import { PostgresResetPasswordRepository } from "./../../../repositories/postgres/postgresResetPasswordRepository";
import { FindResetPasswordByTokenController } from "./findResetPasswordByTokenController";
import { FindResetPasswordByTokenUseCase } from "./findResetPasswordByTokenUseCase";

export const findResetPasswordByTokenFactory = () => {
  const resetPasswordRepository = new PostgresResetPasswordRepository();

  const findResetPasswordByTokenUseCase = new FindResetPasswordByTokenUseCase(
    resetPasswordRepository
  );

  const findResetPasswordByTokenController =
    new FindResetPasswordByTokenController(findResetPasswordByTokenUseCase);

  return findResetPasswordByTokenController;
};
