import { Pool } from "pg";
import { OrdersRepository } from "../ordersRepository";
import { createConnection } from "../../infra/database/connection";
import { Order } from "../../entities/order";

export class PostgresOrdersRepository implements OrdersRepository {
  private client: Pool;

  private async ensureConnection() {
    if (!this.client) {
      this.client = await createConnection();
    }
  }

  async create({
    id,
    address,
    amount,
    paymentType,
    deliveryStatus,
    userId,
    restaurantId,
    customerId,
  }: Order): Promise<void> {
    await this.ensureConnection();

    const query = `
    INSERT INTO orders (id,
      address,
      amount,
      payment_type,
      delivery_status,
      user_id,
      restaurant_id,
      customer_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  `;

    const values = [
      id,
      address,
      amount,
      paymentType,
      deliveryStatus,
      userId,
      restaurantId,
      customerId,
    ];

    await this.client.query(query, values);
  }

  async findById(id: string): Promise<Order | null> {
    await this.ensureConnection();

    const query = `
    SELECT
      id,
      address,
      amount,
      payment_type as "paymentType",
      delivery_status as "deliveryStatus",
      user_id as "userId",
      restaurant_id as "restaurantId",
      customer_id as "customerId",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM
      orders
    WHERE
      id = $1;
    `;

    const values = [id];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const order: Order = result.rows[0];
      return order;
    } else {
      return null;
    }
  }

  async findByUserId(userId: string): Promise<Order[] | null> {
    await this.ensureConnection();

    const query = `
    SELECT
      id,
      address,
      amount,
      payment_type as "paymentType",
      delivery_status as "deliveryStatus",
      user_id as "userId",
      restaurant_id as "restaurantId",
      customer_id as "customerId",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM
      orders
    WHERE
      user_id = $1;
    `;

    const values = [userId];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const order: Order[] = result.rows[0];
      return order;
    } else {
      return [];
    }
  }

  async findByCustomerId(customerId: string): Promise<Order[] | null> {
    await this.ensureConnection();

    const query = `
    SELECT
      id,
      address,
      amount,
      payment_type as "paymentType",
      delivery_status as "deliveryStatus",
      user_id as "userId",
      restaurant_id as "restaurantId",
      customer_id as "customerId",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM
      orders
    WHERE
      customer_id = $1;
    `;

    const values = [customerId];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const order: Order[] = result.rows[0];
      return order;
    } else {
      return [];
    }
  }

  async findIndex(id: string): Promise<number> {
    await this.ensureConnection();

    const query = "SELECT * FROM orders";
    const result = await this.client.query(query);

    const index = result.rows.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update({
    id,
    address,
    amount,
    paymentType,
    deliveryStatus,
    userId,
    restaurantId,
    customerId,
    updatedAt,
  }: Order): Promise<void> {
    await this.ensureConnection();

    const query = `
    UPDATE
      orders
    SET
      address = $2,
      amount = $3,
      payment_type = $4,
      delivery_status = $5,
      use_id = $6,
      restaurant_id = $7,
      customer_id = $8,
      updated_at = $9
    WHERE
      id = $1;
  `;

    const values = [
      id,
      address,
      amount,
      paymentType,
      deliveryStatus,
      userId,
      restaurantId,
      customerId,
      updatedAt ?? new Date(),
    ];

    await this.client.query(query, values);
  }

  async delete(id: string): Promise<void> {
    await this.ensureConnection();

    const query = `
    DELETE FROM orders 
    WHERE id = $1;
  `;

    const values = [id];

    await this.client.query(query, values);
  }
}
