import { createId } from "@paralleldrive/cuid2";

export enum EnumRestaurantCategory {
  JAPANESE = "Japonês",
  FRENCH = "Francês",
  ITALIAN = "Italiano",
  CHINESE = "Chinês",
  BRAZILIAN = "Brasileiro",
  FAST_FOOD = "Fast Food",
  INDIAN = "Indiano",
  MEXICAN = "Mexicano",
  THAI = "Tailandês",
  AMERICAN = "Americano",
  MEDITERRANEAN = "Mediterrâneo",
  VEGETARIAN = "Vegetariano",
  VEGAN = "Vegano",
  SEAFOOD = "Frutos do Mar",
  STEAKHOUSE = "Churrascaria",
  PIZZA = "Pizza",
  DESSERT = "Sobremesas",
  COFFEE_SHOP = "Cafeteria",
  BAR = "Bar",
  PUB = "Pub",
  FOOD_TRUCK = "Food Truck",
  OTHER = "Outra Categoria",
}

export class Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  category: EnumRestaurantCategory;
  description?: string;
  openingHour: number;
  closingHour: number;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(userId: string) {
    if (!this.id) {
      this.id = createId();
    }

    this.userId = userId;
  }
}
