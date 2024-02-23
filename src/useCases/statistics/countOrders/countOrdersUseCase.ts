import { StatisticsRepository } from "../../../repositories/statisticsRepository";
import { RestaurantsRepository } from "../../../repositories/restaurantsRepository";
import { CustomError } from "../../../utils/customError";

interface CountOrdersRequest {
  restaurantId: string;
}

type CountOrdersResponse =
  | {
      data: number;
    }
  | CustomError;

export class CountOrdersUseCase {
  constructor(
    private statisticsRepository: StatisticsRepository,
    private restaurantsRepository: RestaurantsRepository
  ) {}

  async execute({
    restaurantId,
  }: CountOrdersRequest): Promise<CountOrdersResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId);

    if (!restaurant)
      return new CustomError(false, "Restaurante não encontrado", 404);

    return await this.statisticsRepository.countOrders(restaurantId);
  }
}
