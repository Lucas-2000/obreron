import { createId } from "@paralleldrive/cuid2";

export class User {
  id: string;
  email: string;
  username: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
    if (!this.id) {
      this.id = createId();
    }
  }
}
