import { Pool } from "pg";
import { Restaurant } from "../../entities/restaurant";
import { RestaurantsRepository } from "../restaurantsRepository";
import { createConnection } from "../../infra/database/connection";

export class PostgresRestaurantsRepository implements RestaurantsRepository {
  private client: Pool;

  private async ensureConnection() {
    if (!this.client) {
      this.client = await createConnection();
    }
  }

  async create({
    id,
    name,
    address,
    phone,
    category,
    description,
    openingHour,
    closingHour,
    userId,
  }: Restaurant): Promise<void> {
    await this.ensureConnection();

    const query = `
    INSERT INTO restaurants (id, name, address, phone, category, description, openinghour, closinghour, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    const values = [
      id,
      name,
      address,
      phone,
      category,
      description,
      openingHour,
      closingHour,
      userId,
    ];

    await this.client.query(query, values);
  }

  async findById(id: string): Promise<Restaurant | null> {
    await this.ensureConnection();

    const query = `
    SELECT
      id, 
      name, 
      address, 
      phone, 
      category, 
      description, 
      openinghour as "openingHour", 
      closinghour as "closingHour", 
      user_id as "userId",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM
      restaurants
    WHERE
      id = $1;
    `;

    const values = [id];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const restaurant: Restaurant = result.rows[0];
      return restaurant;
    } else {
      return null;
    }
  }

  async findByUserId(userId: string): Promise<Restaurant | null> {
    await this.ensureConnection();

    const query = `
    SELECT
      id, 
      name, 
      address, 
      phone, 
      category, 
      description, 
      openinghour as "openingHour", 
      closinghour as "closingHour", 
      user_id as "userId",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM
      restaurants
    WHERE
      user_id = $1;
    `;

    const values = [userId];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const restaurant: Restaurant = result.rows[0];
      return restaurant;
    } else {
      return null;
    }
  }

  async findIndex(id: string): Promise<number> {
    await this.ensureConnection();

    const query = "SELECT * FROM restaurants";
    const result = await this.client.query(query);

    const index = result.rows.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update({
    id,
    name,
    address,
    phone,
    category,
    description,
    openingHour,
    closingHour,
    updatedAt,
  }: Restaurant): Promise<void> {
    await this.ensureConnection();

    const query = `
    UPDATE 
      restaurants
    SET
      name = $2,
      address = $3,
      phone = $4,
      category = $5,
      description = $6,
      openinghour = $7,
      closinghour = $8,
      updated_at = $9
    WHERE 
      id = $1
  `;

    const values = [
      id,
      name,
      address,
      phone,
      category,
      description,
      openingHour,
      closingHour,
      updatedAt ?? new Date(),
    ];

    await this.client.query(query, values);
  }
}
