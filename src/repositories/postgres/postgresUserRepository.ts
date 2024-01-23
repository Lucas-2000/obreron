import { Pool } from "pg";
import { UsersRepository } from "../usersRepositories";
import { User } from "../../entities/User";
import { createConnection } from "../../infra/database/connection";

export class PostgresUserRepository implements UsersRepository {
  private client: Pool;

  private async ensureConnection() {
    if (!this.client) {
      this.client = await createConnection();
    }
  }

  async create({ id, username, email, password }: User): Promise<void> {
    await this.ensureConnection();

    const query = `
    INSERT INTO users (id, username, email, password)
    VALUES ($1, $2, $3, $4);
    `;

    const values = [id, username, email, password];

    await this.client.query(query, values);
  }

  async findAll(): Promise<User[]> {
    await this.ensureConnection();

    const query = `
    SELECT * FROM users;
    `;

    const result = await this.client.query(query);
    const users: User[] = result.rows;

    return users;
  }

  async findById(id: string): Promise<User | null> {
    await this.ensureConnection();

    const query = `
    SELECT * FROM users WHERE id = $1;
  `;

    const values = [id];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const user: User = result.rows[0];
      return user;
    } else {
      return null;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    await this.ensureConnection();

    const query = `
    SELECT * FROM users WHERE username = $1;
  `;

    const values = [username];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const user: User = result.rows[0];
      return user;
    } else {
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    await this.ensureConnection();

    const query = `
    SELECT * FROM users WHERE email = $1;
  `;

    const values = [email];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const user: User = result.rows[0];
      return user;
    } else {
      return null;
    }
  }

  async findIndex(id: string): Promise<number> {
    await this.ensureConnection();

    const query = "SELECT * FROM users";
    const result = await this.client.query(query);

    const index = result.rows.findIndex((user) => user.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(id: string, password: string, updatedAt?: Date): Promise<void> {
    await this.ensureConnection();

    const query = `
      UPDATE users 
      SET password = $2, updated_at = $3
      WHERE id = $1;
    `;

    const values = [id, password, updatedAt ?? new Date()];

    await this.client.query(query, values);
  }

  async delete(id: string): Promise<void> {
    await this.ensureConnection();

    const query = `
    DELETE FROM users 
    WHERE id = $1;
  `;

    const values = [id];

    await this.client.query(query, values);
  }
}
