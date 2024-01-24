import { createId } from "@paralleldrive/cuid2";

export class ResetPassword {
  id: string;
  token: string;
  expiresIn: Date;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(userId: string) {
    if (!this.id) {
      this.id = createId();
    }

    this.userId = userId;
  }

  isExpired(): boolean {
    return this.expiresIn < new Date();
  }
}
