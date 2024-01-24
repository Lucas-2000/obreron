import { createId } from "@paralleldrive/cuid2";

export class ResetPassword {
  id: string;
  token: string;
  expiresIn: Date;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(userId: string, expirationMinutes: number = 10) {
    if (!this.id) {
      this.id = createId();
    }

    if (!this.token) {
      this.token = createId();
    }

    this.userId = userId;

    const currentTime = new Date();
    this.expiresIn = new Date(
      currentTime.getTime() + expirationMinutes * 60000
    );
  }

  isExpired(): boolean {
    return this.expiresIn < new Date();
  }
}
