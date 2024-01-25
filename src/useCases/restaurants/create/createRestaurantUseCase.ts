import { UsersRepository } from "./../../../repositories/usersRepository";
import {
  EnumRestaurantCategory,
  Restaurant,
} from "../../../entities/restaurant";
import { RestaurantsRepository } from "../../../repositories/restaurantsRepository";
import { CustomError } from "./../../../utils/customError";

interface CreateRestaurantRequest {
  name: string;
  address: string;
  phone: string;
  category: EnumRestaurantCategory;
  description?: string;
  openingHour: number;
  closingHour: number;
  userId: string;
}

type CreateRestaurantResponse = void | CustomError;

export class CreateRestaurantUseCase {
  constructor(
    private restaurantsRepository: RestaurantsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    address,
    phone,
    category,
    description,
    openingHour,
    closingHour,
    userId,
  }: CreateRestaurantRequest): Promise<CreateRestaurantResponse> {
    if (
      name.trim() === "" ||
      address.trim() === "" ||
      phone.trim() === "" ||
      category.trim() === null ||
      openingHour === null ||
      closingHour === null ||
      userId.trim() === ""
    )
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists)
      return new CustomError(false, "Usuário não encontrado", 404);

    const validCategories: string[] = Object.values(EnumRestaurantCategory);

    if (!validCategories.includes(category)) {
      return new CustomError(false, "Categoria inválida", 404);
    }

    const restaurant = new Restaurant(userId);
    restaurant.name = name;
    restaurant.address = address;
    restaurant.phone = phone;
    restaurant.category = category;
    restaurant.description = description;
    restaurant.openingHour = openingHour;
    restaurant.closingHour = closingHour;

    await this.restaurantsRepository.create(restaurant);
  }
}
