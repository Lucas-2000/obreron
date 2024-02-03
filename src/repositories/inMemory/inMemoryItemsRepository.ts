import { Item } from "../../entities/item";
import { ItemsRepository } from "../itemsRepository";

export class InMemoryItemsRepository implements ItemsRepository {
  private items: Item[] = [];

  async create(item: Item): Promise<void> {
    this.items.push(item);
  }

  async findById(id: string): Promise<Item | null> {
    const item = this.items.find((r) => r.id === id);

    return item || null;
  }

  async findByUserId(userId: string): Promise<Item[] | null> {
    const items = this.items.filter((r) => r.userId === userId);

    return items.length > 0 ? items : null;
  }

  async findIndex(id: string): Promise<number> {
    const index = this.items.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(item: Item): Promise<void> {
    const itemToUpdate = this.items.find((u) => u.id === item.id);

    const updateDate = item.updatedAt || new Date();

    if (itemToUpdate !== undefined) {
      Object.assign(itemToUpdate, {
        item,
        updatedAt: updateDate,
      });
    }
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    if (itemIndex < 0) return;

    this.items.splice(itemIndex, 1);
  }
}
