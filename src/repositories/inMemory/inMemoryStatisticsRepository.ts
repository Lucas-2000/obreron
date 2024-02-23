import { Order } from "./../../entities/order";
import { Statistics } from "../../entities/statistics";
import { StatisticsRepository } from "../statisticsRepository";

export class InMemoryStatisticsRepository implements StatisticsRepository {
  private statistics: Statistics<number>[] = [];
  private orders: Order[] = [];

  async insert(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async countOrders(): Promise<Statistics<number>> {
    const totalOrders = this.orders.length;
    const statistic = new Statistics<number>("Total de Pedidos", totalOrders);

    this.statistics.push(statistic);

    return statistic;
  }

  async countOrdersOnTheDay(): Promise<Statistics<number>> {
    const today = new Date();
    const ordersOnTheDay = this.orders.filter(
      (order) =>
        order.createdAt &&
        order.createdAt.getDate() === today.getDate() &&
        order.createdAt.getMonth() === today.getMonth() &&
        order.createdAt.getFullYear() === today.getFullYear()
    );

    const statistic = new Statistics<number>(
      "Total de Pedidos no dia",
      ordersOnTheDay.length
    );

    this.statistics.push(statistic);

    return statistic;
  }

  async totalAmount(): Promise<Statistics<number>> {
    const totalAmount = this.orders.reduce((acc, order) => {
      return acc + order.amount;
    }, 0);
    const statistic = new Statistics<number>("Total de Pedidos", totalAmount);

    this.statistics.push(statistic);

    return statistic;
  }

  async totalAmountOnPeriod(
    startDate: Date,
    finalDate: Date
  ): Promise<Statistics<number>> {
    const ordersOnTheDay = this.orders.filter(
      (order) =>
        order.createdAt &&
        order.createdAt.getTime() >= startDate.getTime() &&
        order.createdAt.getTime() <= finalDate.getTime()
    );

    const statistic = new Statistics<number>(
      "Total de Pedidos no período",
      ordersOnTheDay.length
    );

    this.statistics.push(statistic);

    return statistic;
  }

  async countMorePopularsItems(): Promise<Statistics<number>> {
    throw new Error("Method not implemented.");
  }
}
