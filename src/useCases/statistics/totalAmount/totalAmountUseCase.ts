import { StatisticsRepository } from "../../../repositories/statisticsRepository";
import { RestaurantsRepository } from "../../../repositories/restaurantsRepository";
import { CustomError } from "../../../utils/customError";

interface TotalAmountRequest {
  restaurantId: string;
}

type TotalAmountResponse =
  | {
      data: number;
    }
  | CustomError;

export class TotalAmountUseCase {
  constructor(
    private statisticsRepository: StatisticsRepository,
    private restaurantsRepository: RestaurantsRepository
  ) {}

  async execute({
    restaurantId,
  }: TotalAmountRequest): Promise<TotalAmountResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId);

    if (!restaurant)
      return new CustomError(false, "Restaurante não encontrado", 404);

    return await this.statisticsRepository.totalAmount(restaurantId);
  }
}
