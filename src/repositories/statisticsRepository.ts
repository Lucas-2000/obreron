import { Statistics } from "../entities/statistics";

export interface StatisticsRepository {
  countOrders(): Promise<Statistics<number>>;
  countOrdersOnTheDay(): Promise<Statistics<number>>;
  totalAmount(): Promise<Statistics<number>>;
  totalAmountOnPeriod(
    startDate: Date,
    finalDate: Date
  ): Promise<Statistics<number>>;
  countMorePopularsItems(): Promise<Statistics<number>>;
}
