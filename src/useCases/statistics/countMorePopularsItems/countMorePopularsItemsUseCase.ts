import { StatisticsRepository } from "../../../repositories/statisticsRepository";
import { RestaurantsRepository } from "../../../repositories/restaurantsRepository";
import { CustomError } from "../../../utils/customError";

interface CountMorePopularsItemsRequest {
  restaurantId: string;
}

type CountMorePopularsItemsResponse =
  | {
      data: number;
    }
  | CustomError;

export class CountMorePopularsItemsUseCase {
  constructor(
    private statisticsRepository: StatisticsRepository,
    private restaurantsRepository: RestaurantsRepository
  ) {}

  async execute({
    restaurantId,
  }: CountMorePopularsItemsRequest): Promise<CountMorePopularsItemsResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId);

    if (!restaurant)
      return new CustomError(false, "Restaurante não encontrado", 404);

    return await this.statisticsRepository.countMorePopularsItems(restaurantId);
  }
}
