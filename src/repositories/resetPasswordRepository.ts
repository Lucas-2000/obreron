import { ResetPassword } from "./../entities/resetPassword";

export interface ResetPasswordRepository {
  generate(resetPassword: ResetPassword): Promise<void>;
  findById(id: string): Promise<ResetPassword | null>;
  findByToken(token: string): Promise<ResetPassword | null>;
  findByUserId(userId: string): Promise<ResetPassword | null>;
  findIndex(id: string): Promise<number>;
  delete(userId: string): Promise<void>;
}
