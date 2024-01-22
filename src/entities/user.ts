import { createId } from "@paralleldrive/cuid2";

export class User {
  id: string;
  name: string;
  email: string;
  username: string;

  constructor() {
    if (!this.id) {
      this.id = createId();
    }
  }
}
