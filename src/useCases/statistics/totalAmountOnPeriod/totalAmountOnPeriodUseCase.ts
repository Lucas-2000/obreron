import { StatisticsRepository } from "../../../repositories/statisticsRepository";
import { RestaurantsRepository } from "../../../repositories/restaurantsRepository";
import { CustomError } from "../../../utils/customError";

interface TotalAmountOnPeriodRequest {
  restaurantId: string;
  startDate: Date;
  finalDate: Date;
}

type TotalAmountOnPeriodResponse =
  | {
      data: number;
    }
  | CustomError;

export class TotalAmountOnPeriodUseCase {
  constructor(
    private statisticsRepository: StatisticsRepository,
    private restaurantsRepository: RestaurantsRepository
  ) {}

  async execute({
    startDate,
    finalDate,
    restaurantId,
  }: TotalAmountOnPeriodRequest): Promise<TotalAmountOnPeriodResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId);

    if (!restaurant)
      return new CustomError(false, "Restaurante não encontrado", 404);

    return await this.statisticsRepository.totalAmountOnPeriod(
      startDate,
      finalDate,
      restaurantId
    );
  }
}
