import { Pool } from "pg";
import { createConnection } from "../../infra/database/connection";
import { CustomersRepository } from "../customersRepository";
import { Customer } from "../../entities/customer";

export class PostgresCustomersRepository implements CustomersRepository {
  private client: Pool;

  private async ensureConnection() {
    if (!this.client) {
      this.client = await createConnection();
    }
  }

  async create({
    id,
    name,
    birthDate,
    phone,
    address,
    email,
    gender,
    isActive,
    observation,
    userId,
  }: Customer): Promise<void> {
    await this.ensureConnection();

    const query = `
    INSERT INTO customers (id,
      name,
      birth_date,
      phone,
      address,
      email,
      gender,
      is_active,
      observation,
      user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;

    const values = [
      id,
      name,
      birthDate,
      phone,
      address,
      email,
      gender,
      isActive,
      observation,
      userId,
    ];

    await this.client.query(query, values);
  }

  async findById(id: string): Promise<Customer | null> {
    await this.ensureConnection();

    const query = `
    SELECT
      id,
      name,
      birth_date as "birthDate",
      phone,
      address,
      email,
      gender,
      is_active as "isActive",
      observation,
      user_id as "userId",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM
      customers
    WHERE
      id = $1;
    `;

    const values = [id];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const customer: Customer = result.rows[0];
      return customer;
    } else {
      return null;
    }
  }

  async findByUserId(userId: string): Promise<Customer[] | null> {
    await this.ensureConnection();

    const query = `
    SELECT
      id,
      name,
      birth_date as "birthDate",
      phone,
      address,
      email,
      gender,
      is_active as "isActive",
      observation,
      user_id as "userId",
      created_at as "createdAt",
      updated_at as "updatedAt"
    FROM
      customers
    WHERE
      user_id = $1;
    `;

    const values = [userId];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const customers: Customer[] = result.rows;
      return customers;
    } else {
      return [];
    }
  }

  async findIndex(id: string): Promise<number> {
    await this.ensureConnection();

    const query = "SELECT * FROM customers";
    const result = await this.client.query(query);

    const index = result.rows.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update({
    id,
    name,
    birthDate,
    phone,
    address,
    email,
    gender,
    isActive,
    observation,
    updatedAt,
  }: Customer): Promise<void> {
    await this.ensureConnection();

    const query = `
    UPDATE
      customers
    SET
      name = $2,
      birth_date = $3,
      phone = $4,
      address = $5,
      email = $6,
      gender = $7,
      is_active = $8,
      observation = $9,
      updated_at = $10
    WHERE
      id = $1;
  `;

    const values = [
      id,
      name,
      birthDate,
      phone,
      address,
      email,
      gender,
      isActive,
      observation,
      updatedAt ?? new Date(),
    ];

    await this.client.query(query, values);
  }

  async delete(id: string): Promise<void> {
    await this.ensureConnection();

    const query = `
    DELETE FROM customers 
    WHERE id = $1;
  `;

    const values = [id];

    await this.client.query(query, values);
  }
}
