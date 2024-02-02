import { Item } from "../entities/item";

export interface ItemsRepository {
  create(item: Item): Promise<void>;
  findById(id: string): Promise<Item | null>;
  findByUserId(userId: string): Promise<Item | null>;
  findIndex(id: string): Promise<number>;
  update(item: Item): Promise<void>;
  delete(id: string): Promise<void>;
}
