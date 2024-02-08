import { OrderItem } from "./../entities/orderItem";

export interface OrderItemsRepository {
  create(orderItem: OrderItem): Promise<void>;
  findById(id: string): Promise<OrderItem | null>;
  findByOrderId(orderId: string): Promise<OrderItem[] | null>;
  findIndex(id: string): Promise<number>;
  update(orderItem: OrderItem): Promise<void>;
  delete(id: string): Promise<void>;
}
