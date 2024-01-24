import { ResetPassword } from "../../../entities/resetPassword";
import { ResetPasswordRepository } from "../../../repositories/resetPasswordRepository";
import { CustomError } from "../../../utils/customError";
import { DateUtils } from "../../../utils/dateUtils";

interface FindResetPasswordByTokenRequest {
  token: string;
}

type FindResetPasswordByTokenResponse =
  | {
      token: string;
      userId: string;
      isValid: boolean;
    }
  | CustomError;

export class FindResetPasswordByTokenUseCase {
  constructor(private resetPasswordRepository: ResetPasswordRepository) {}

  async execute({
    token,
  }: FindResetPasswordByTokenRequest): Promise<FindResetPasswordByTokenResponse> {
    const tokenExists = await this.resetPasswordRepository.findByToken(token);

    if (!tokenExists)
      return new CustomError(false, "Token não encontrado", 404);

    const dateUtils = new DateUtils(tokenExists.expiresIn);

    return {
      token,
      userId: tokenExists.userId,
      isValid: dateUtils.isDateTimeBeforeCurrentDateTimeInBrazil(),
    };
  }
}
