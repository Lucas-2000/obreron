import { Statistics } from "../entities/statistics";

export interface StatisticsRepository {
  countOrders(restaurantId: string): Promise<Statistics<number>>;
  countOrdersOnTheDay(restaurantId: string): Promise<Statistics<number>>;
  totalAmount(restaurantId: string): Promise<Statistics<number>>;
  totalAmountOnPeriod(
    startDate: Date,
    finalDate: Date,
    restaurantId: string
  ): Promise<Statistics<number>>;
  countMorePopularsItems(restaurantId: string): Promise<Statistics<number>>;
}
