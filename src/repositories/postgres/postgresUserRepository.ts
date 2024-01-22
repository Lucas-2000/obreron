import { Pool } from "pg";
import { UsersRepository } from "../usersRepositories";
import { User } from "../../entities/User";
import { createConnection } from "../../infra/database/connection";

export class PostgresUserRepository implements UsersRepository {
  private client: Pool;

  constructor() {
    this.init();
  }

  private async init() {
    this.client = await createConnection();
  }

  async create({ id, username, email, password }: User): Promise<void> {
    if (!this.client) {
      await this.init();
    }

    const query = `
    INSERT INTO users (id, username, email, password)
    VALUES ($1, $2, $3, $4);
    `;

    const values = [id, username, email, password];

    await this.client.query(query, values);
  }

  async findAll(): Promise<User[]> {
    const query = `
    SELECT * FROM users;
    `;

    const result = await this.client.query(query);
    const users: User[] = result.rows;

    return users;
  }

  async findById(id: string): Promise<User | null> {
    if (!this.client) {
      await this.init();
    }

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
    if (!this.client) {
      await this.init();
    }

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
    const query = "SELECT * FROM users";
    const result = await this.client.query(query);

    const index = result.rows.findIndex((user) => user.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update({
    id,
    username,
    email,
    password,
    updatedAt,
  }: User): Promise<void> {
    const query = `
      UPDATE users 
      SET username = $2, email = $3, password = $4, updated_at = $5
      WHERE id = $1;
    `;

    const values = [id, username, email, password, updatedAt ?? new Date()];

    await this.client.query(query, values);
  }

  async delete(id: string): Promise<void> {
    const query = `
    DELETE FROM users 
    WHERE id = $1;
  `;

    const values = [id];

    await this.client.query(query, values);
  }
}
