import { Order } from "./../entities/order";

export interface OrdersRepository {
  create(order: Order): Promise<void>;
  findById(id: string): Promise<Order | null>;
  findByUserId(userId: string): Promise<Order[] | null>;
  findByUserIdAndActive(
    userId: string,
    delivered: string
  ): Promise<Order[] | null>;
  findByCustomerId(customerId: string): Promise<Order[] | null>;
  findIndex(id: string): Promise<number>;
  update(order: Order): Promise<void>;
  delete(id: string): Promise<void>;
}
