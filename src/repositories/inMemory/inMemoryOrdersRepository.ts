import { Order } from "../../entities/order";
import { OrdersRepository } from "../ordersRepository";

export class InMemoryOrdersRepository implements OrdersRepository {
  private orders: Order[] = [];

  async create(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.orders.find((r) => r.id === id);

    return order || null;
  }

  async findByUserId(userId: string): Promise<Order[] | null> {
    const orders = this.orders.filter((r) => r.userId === userId);

    return orders.length > 0 ? orders : null;
  }

  async findByCustomerId(customerId: string): Promise<Order[] | null> {
    const orders = this.orders.filter((r) => r.customerId === customerId);

    return orders.length > 0 ? orders : null;
  }

  async findIndex(id: string): Promise<number> {
    const index = this.orders.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(order: Order): Promise<void> {
    const orderToUpdate = this.orders.find((u) => u.id === order.id);

    const updateDate = order.updatedAt || new Date();

    if (orderToUpdate !== undefined) {
      Object.assign(orderToUpdate, {
        order,
        updatedAt: updateDate,
      });
    }
  }

  async delete(id: string): Promise<void> {
    const orderIndex = this.orders.findIndex((order) => order.id === id);

    if (orderIndex < 0) return;

    this.orders.splice(orderIndex, 1);
  }
}
