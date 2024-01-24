import { CustomError } from "../../../utils/customError";
import { ResetPasswordRepository } from "./../../../repositories/resetPasswordRepository";
import { UsersRepository } from "../../../repositories/usersRepository";
import { ResetPassword } from "../../../entities/resetPassword";

interface GenerateResetPasswordRequest {
  userId: string;
}

type GenerateResetPasswordResponse = { token: string } | CustomError;

export class GenerateResetPasswordUseCase {
  constructor(
    private resetPasswordRepository: ResetPasswordRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
  }: GenerateResetPasswordRequest): Promise<GenerateResetPasswordResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) return new CustomError(false, "Usuário não encontrado", 404);

    const resetPasswordAlreadyExists =
      await this.resetPasswordRepository.findByUserId(userId);

    if (resetPasswordAlreadyExists)
      await this.resetPasswordRepository.delete(userId);

    const resetPassword = new ResetPassword(userId);

    await this.resetPasswordRepository.generate(resetPassword);

    return { token: resetPassword.token };
  }
}
