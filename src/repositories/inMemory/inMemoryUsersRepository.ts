import { UsersRepository } from "./../usersRepository";
import { User } from "../../entities/User";

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    return user || null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = this.users.find((user) => user.username === username);

    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user || null;
  }

  async findIndex(id: string): Promise<number> {
    const index = this.users.findIndex((u) => u.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(id: string, password: string, updatedAt?: Date): Promise<void> {
    const userToUpdate = this.users.find((u) => u.id === id);

    const updateDate = updatedAt || new Date();

    if (userToUpdate !== undefined) {
      Object.assign(userToUpdate, {
        password,
        updatedAt: updateDate,
      });
    }
  }

  async delete(id: string): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex < 0) return;

    this.users.splice(userIndex, 1);
  }
}
