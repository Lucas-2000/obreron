import { Restaurant } from "../entities/restaurant";

export interface RestaurantsRepository {
  create(restaurant: Restaurant): Promise<void>;
  findById(id: string): Promise<Restaurant | null>;
  findByUserId(userId: string): Promise<Restaurant | null>;
  findIndex(id: string): Promise<number>;
  update(restaurant: Restaurant): Promise<void>;
}
