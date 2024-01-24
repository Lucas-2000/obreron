import { User } from "../entities/User";

export interface UsersRepository {
  create(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findIndex(id: string): Promise<number>;
  update(id: string, password: string, updatedAt?: Date): Promise<void>;
  delete(id: string): Promise<void>;
}
