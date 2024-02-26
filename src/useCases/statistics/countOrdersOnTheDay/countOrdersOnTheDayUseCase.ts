import { StatisticsRepository } from "../../../repositories/statisticsRepository";
import { RestaurantsRepository } from "../../../repositories/restaurantsRepository";
import { CustomError } from "../../../utils/customError";

interface CountOrdersOnTheDayUseCaseRequest {
  restaurantId: string;
}

type CountOrdersOnTheDayUseCaseResponse =
  | {
      data: number;
    }
  | CustomError;

export class CountOrdersOnTheDayUseCase {
  constructor(
    private statisticsRepository: StatisticsRepository,
    private restaurantsRepository: RestaurantsRepository
  ) {}

  async execute({
    restaurantId,
  }: CountOrdersOnTheDayUseCaseRequest): Promise<CountOrdersOnTheDayUseCaseResponse> {
    const restaurant = await this.restaurantsRepository.findById(restaurantId);

    if (!restaurant)
      return new CustomError(false, "Restaurante não encontrado", 404);

    return await this.statisticsRepository.countOrdersOnTheDay(restaurantId);
  }
}
