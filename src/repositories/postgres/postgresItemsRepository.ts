import { Pool } from "pg";
import { Item } from "../../entities/item";
import { ItemsRepository } from "../itemsRepository";
import { createConnection } from "../../infra/database/connection";

export class PostgresItemsRepository implements ItemsRepository {
  private client: Pool;

  private async ensureConnection() {
    if (!this.client) {
      this.client = await createConnection();
    }
  }

  async create({
    id,
    name,
    description,
    priceInCents,
    available,
    preparationTime,
    ingredients,
    userId,
  }: Item): Promise<void> {
    await this.ensureConnection();

    const query = `
    INSERT INTO items (id,
      name,
      description,
      price_in_cents,
      available,
      preparation_time,
      ingredients,
      user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;

    const values = [
      id,
      name,
      description,
      priceInCents,
      available,
      preparationTime,
      ingredients,
      userId,
    ];

    await this.client.query(query, values);
  }

  async findById(id: string): Promise<Item | null> {
    await this.ensureConnection();

    const query = `
    SELECT
      id,
      name,
      description,
      priceInCents as "price_in_cents",
      available,
      preparationTime as "preparation_time",
      ingredients,
      userId as "user_id",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM
      items
    WHERE
      id = $1;
    `;

    const values = [id];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const item: Item = result.rows[0];
      return item;
    } else {
      return null;
    }
  }

  async findByUserId(userId: string): Promise<Item | null> {
    await this.ensureConnection();

    const query = `
    SELECT
      id,
      name,
      description,
      price_in_cents as "priceInCents",
      available,
      preparation_time as "preparationTime",
      ingredients,
      user_id as "userId",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM
      items
    WHERE
      user_id = $1;
    `;

    const values = [userId];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const item: Item = result.rows[0];
      return item;
    } else {
      return null;
    }
  }

  async findIndex(id: string): Promise<number> {
    await this.ensureConnection();

    const query = "SELECT * FROM items";
    const result = await this.client.query(query);

    const index = result.rows.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update({
    id,
    name,
    description,
    priceInCents,
    available,
    preparationTime,
    ingredients,
    updatedAt,
  }: Item): Promise<void> {
    await this.ensureConnection();

    const query = `
    UPDATE
      items
    SET
      name = $2,
      description = $3,
      price_in_cents = $4,
      available = $5,
      preparation_time = $6,
      ingredients = $7,
      updated_at = $8
    FROM
      items
    WHERE
      id = $1;
  `;

    const values = [
      id,
      name,
      description,
      priceInCents,
      available,
      preparationTime,
      ingredients,
      updatedAt ?? new Date(),
    ];

    await this.client.query(query, values);
  }

  async delete(id: string): Promise<void> {
    await this.ensureConnection();

    const query = `
    DELETE FROM items 
    WHERE id = $1;
  `;

    const values = [id];

    await this.client.query(query, values);
  }
}
