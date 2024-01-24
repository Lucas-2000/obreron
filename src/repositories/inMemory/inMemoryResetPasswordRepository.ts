import { ResetPassword } from "../../entities/resetPassword";
import { ResetPasswordRepository } from "../resetPasswordRepository";

export class InMemoryResetPasswordRepository
  implements ResetPasswordRepository
{
  private resetPasswordData: ResetPassword[] = [];

  async generate(resetPassword: ResetPassword): Promise<void> {
    this.resetPasswordData.push(resetPassword);
  }

  async findById(id: string): Promise<ResetPassword | null> {
    const resetPassword = this.resetPasswordData.find((r) => r.id === id);

    if (resetPassword) return resetPassword;

    return null;
  }

  async findByToken(token: string): Promise<ResetPassword | null> {
    const resetPassword = this.resetPasswordData.find((r) => r.token === token);

    if (resetPassword) return resetPassword;

    return null;
  }

  async findByUserId(userId: string): Promise<ResetPassword | null> {
    const resetPassword = this.resetPasswordData.find(
      (r) => r.userId === userId
    );

    if (resetPassword) return resetPassword;

    return null;
  }

  async findIndex(id: string): Promise<number> {
    const index = this.resetPasswordData.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async delete(userId: string): Promise<void> {
    const index = this.resetPasswordData.findIndex((r) => r.userId === userId);

    if (index < 0) return;

    this.resetPasswordData.splice(index, 1);
  }
}
