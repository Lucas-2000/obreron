import { createId } from "@paralleldrive/cuid2";

export class Items {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  available: boolean;
  preparationTime: number;
  ingredients: string[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(userId: string) {
    if (!this.id) {
      this.id = createId();
    }

    this.userId = userId;
  }
}
