import { createId } from "@paralleldrive/cuid2";

export class OrderItem {
  id: string;
  quantity: number;
  notes: string;
  itemId: string;
  orderId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(itemId: string, orderId: string) {
    if (!this.id) {
      this.id = createId();
    }

    this.itemId = itemId;
    this.orderId = orderId;
  }
}
