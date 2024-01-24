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

    const currentTimeBrazil = new Date().toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    });

    const currentDateTimeBrazil = new Date(currentTimeBrazil);

    this.expiresIn = new Date(
      currentDateTimeBrazil.getTime() + expirationMinutes * 60000
    );
  }
}
