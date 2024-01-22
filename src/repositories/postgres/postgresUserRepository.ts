import { Pool } from "pg";
import { UsersRepository } from "../usersRepositories";
import { User } from "../../entities/User";
import { createConnection } from "../../database/connection";

export class PostgresUserRepository implements UsersRepository {
  private client: Pool;

  constructor() {
    createConnection().then((client) => (this.client = client));
  }

  async create({ username, email, password }: User): Promise<void> {
    const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    `;

    const values = [username, email, password];

    await this.client.query(query, values);
  }

  async findAll(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async findById(id: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findByUsername(username: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  async findIndex(id: string): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async update(user: User): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
