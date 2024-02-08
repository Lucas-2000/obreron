import { OrderItem } from "../../entities/orderItem";
import { OrderItemsRepository } from "../orderItemsRepository";

export class InMemoryOrderItemsRepository implements OrderItemsRepository {
  private orderItems: OrderItem[] = [];

  async create(orderItem: OrderItem): Promise<void> {
    this.orderItems.push(orderItem);
  }

  async findById(id: string): Promise<OrderItem | null> {
    const orderItem = this.orderItems.find((r) => r.id === id);

    return orderItem || null;
  }

  async findByOrderId(orderId: string): Promise<OrderItem[] | null> {
    const orderItems = this.orderItems.filter((r) => r.orderId === orderId);

    return orderItems.length > 0 ? orderItems : null;
  }

  async findIndex(id: string): Promise<number> {
    const index = this.orderItems.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(orderItem: OrderItem): Promise<void> {
    const orderItemToUpdate = this.orderItems.find(
      (u) => u.id === orderItem.id
    );

    const updateDate = orderItem.updatedAt || new Date();

    if (orderItemToUpdate !== undefined) {
      Object.assign(orderItemToUpdate, {
        orderItem,
        updatedAt: updateDate,
      });
    }
  }

  async delete(id: string): Promise<void> {
    const orderItemIndex = this.orderItems.findIndex(
      (orderItem) => orderItem.id === id
    );

    if (orderItemIndex < 0) return;

    this.orderItems.splice(orderItemIndex, 1);
  }
}
