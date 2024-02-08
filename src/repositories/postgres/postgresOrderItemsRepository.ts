import { Pool } from "pg";
import { createConnection } from "../../infra/database/connection";
import { OrderItemsRepository } from "./../orderItemsRepository";
import { OrderItem } from "../../entities/orderItem";

export class PostgresOrderItemsRepository implements OrderItemsRepository {
  private client: Pool;

  private async ensureConnection() {
    if (!this.client) {
      this.client = await createConnection();
    }
  }

  async create(orderItem: OrderItem): Promise<void> {
    await this.ensureConnection();

    const query = `
      INSERT INTO order_items (id, quantity, notes, item_id, order_id)
      VALUES ($1, $2, $3, $4, $5);
    `;

    const values = [
      orderItem.id,
      orderItem.quantity,
      orderItem.notes,
      orderItem.itemId,
      orderItem.orderId,
    ];

    await this.client.query(query, values);
  }

  async findById(id: string): Promise<OrderItem | null> {
    await this.ensureConnection();

    const query = `
      SELECT id, quantity, notes, item_id as "itemId", order_id as "orderId"
      FROM order_items
      WHERE id = $1;
    `;

    const result = await this.client.query(query, [id]);

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  }

  async findByOrderId(orderId: string): Promise<OrderItem[] | null> {
    await this.ensureConnection();

    const query = `
      SELECT id, quantity, notes, item_id as "itemId", order_id as "orderId"
      FROM order_items
      WHERE order_id = $1;
    `;

    const result = await this.client.query(query, [orderId]);

    if (result.rows.length > 0) {
      const orderItems: OrderItem[] = result.rows[0];
      return orderItems;
    } else {
      return [];
    }
  }

  async findIndex(id: string): Promise<number> {
    await this.ensureConnection();

    const query = "SELECT * FROM order_items";
    const result = await this.client.query(query);

    const index = result.rows.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(orderItem: OrderItem): Promise<void> {
    await this.ensureConnection();

    const query = `
      UPDATE order_items
      SET quantity = $2, notes = $3, item_id = $4, order_id = $5, updated_at = $6
      WHERE id = $1;
    `;

    const values = [
      orderItem.id,
      orderItem.quantity,
      orderItem.notes,
      orderItem.itemId,
      orderItem.orderId,
      orderItem.updatedAt ?? new Date(),
    ];

    await this.client.query(query, values);
  }

  async delete(id: string): Promise<void> {
    await this.ensureConnection();

    const query = "DELETE FROM order_items WHERE id = $1;";
    const values = [id];

    await this.client.query(query, values);
  }
}
