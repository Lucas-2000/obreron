import { EnumRestaurantCategory } from "../../../entities/restaurant";
import { RestaurantsRepository } from "../../../repositories/restaurantsRepository";
import { CustomError } from "../../../utils/customError";

interface FindRestaurantByUserIdRequest {
  userId: string;
}

type FindRestaurantByUserIdResponse =
  | {
      name: string;
      address: string;
      phone: string;
      category: EnumRestaurantCategory;
      description?: string;
      openingHour: number;
      closingHour: number;
    }
  | CustomError;

export class FindRestaurantByUserIdUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    userId,
  }: FindRestaurantByUserIdRequest): Promise<FindRestaurantByUserIdResponse> {
    if (userId.trim() === "")
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const restaurant = await this.restaurantsRepository.findByUserId(userId);

    if (!restaurant)
      return new CustomError(false, "Restaurante não encontrado", 404);

    return {
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
      category: restaurant.category,
      description: restaurant.description,
      openingHour: restaurant.openingHour,
      closingHour: restaurant.closingHour,
    };
  }
}
