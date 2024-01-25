import { Restaurant } from "../../entities/restaurant";
import { RestaurantsRepository } from "../restaurantsRepository";

export class InMemoryRestaurantsRepository implements RestaurantsRepository {
  private restaurants: Restaurant[] = [];

  async create(restaurant: Restaurant): Promise<void> {
    this.restaurants.push(restaurant);
  }

  async findById(id: string): Promise<Restaurant | null> {
    const restaurant = this.restaurants.find((r) => r.id === id);

    return restaurant || null;
  }

  async findByUserId(userId: string): Promise<Restaurant | null> {
    const restaurant = this.restaurants.find((r) => r.userId === userId);

    return restaurant || null;
  }

  async findIndex(id: string): Promise<number> {
    const index = this.restaurants.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(restaurant: Restaurant): Promise<void> {
    const restaurantToUpdate = this.restaurants.find(
      (u) => u.id === restaurant.id
    );

    const updateDate = restaurant.updatedAt || new Date();

    if (restaurantToUpdate !== undefined) {
      Object.assign(restaurantToUpdate, {
        restaurant,
        updatedAt: updateDate,
      });
    }
  }
}
