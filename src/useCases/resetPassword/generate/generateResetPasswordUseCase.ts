import { CustomError } from "../../../utils/customError";
import { ResetPasswordRepository } from "./../../../repositories/resetPasswordRepository";
import { UsersRepository } from "../../../repositories/usersRepository";
import { ResetPassword } from "../../../entities/resetPassword";
import { Email } from "../../../entities/email";

interface GenerateResetPasswordRequest {
  email: string;
}

type GenerateResetPasswordResponse = void | CustomError;

export class GenerateResetPasswordUseCase {
  constructor(
    private resetPasswordRepository: ResetPasswordRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    email,
  }: GenerateResetPasswordRequest): Promise<GenerateResetPasswordResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) return new CustomError(false, "Usuário não encontrado", 404);

    const resetPasswordAlreadyExists =
      await this.resetPasswordRepository.findByUserId(user.id);

    if (resetPasswordAlreadyExists)
      await this.resetPasswordRepository.delete(user.id);

    const resetPassword = new ResetPassword(user.id);

    await this.resetPasswordRepository.generate(resetPassword);

    const emailInstance = new Email();

    await emailInstance.sendPasswordResetEmail(email, resetPassword.token);
  }
}
