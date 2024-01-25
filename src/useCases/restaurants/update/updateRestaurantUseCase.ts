import { RestaurantsRepository } from "./../../../repositories/restaurantsRepository";
import { EnumRestaurantCategory } from "../../../entities/restaurant";
import { CustomError } from "../../../utils/customError";

interface UpdateRestaurantRequest {
  id: string;
  name: string;
  address: string;
  phone: string;
  category: EnumRestaurantCategory;
  description: string;
  openingHour: number;
  closingHour: number;
}

type UpdateRestaurantResponse =
  | {
      name: string;
      address: string;
      phone: string;
      category: EnumRestaurantCategory;
      description: string;
      openingHour: number;
      closingHour: number;
    }
  | CustomError;

export class UpdateRestaurantUseCase {
  constructor(private restaurantsRepository: RestaurantsRepository) {}

  async execute({
    id,
    name,
    address,
    phone,
    category,
    description,
    openingHour,
    closingHour,
  }: UpdateRestaurantRequest): Promise<UpdateRestaurantResponse> {
    if (
      id.trim() === "" ||
      name.trim() === "" ||
      address.trim() === "" ||
      phone.trim() === "" ||
      category.trim() === null ||
      openingHour === null ||
      closingHour === null
    )
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const restaurant = await this.restaurantsRepository.findById(id);

    if (!restaurant)
      return new CustomError(false, "Restaurante não encontrado", 404);

    const validCategories: string[] = Object.values(EnumRestaurantCategory);

    if (!validCategories.includes(category)) {
      return new CustomError(false, "Categoria inválida", 404);
    }

    await this.restaurantsRepository.update({
      id,
      name,
      address,
      phone,
      category,
      description,
      openingHour,
      closingHour,
      userId: restaurant.userId,
    });

    return {
      name,
      address,
      phone,
      category,
      description,
      openingHour,
      closingHour,
    };
  }
}
