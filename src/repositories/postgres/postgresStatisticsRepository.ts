// PostgresStatisticsRepository.ts

import { Pool } from "pg";
import { StatisticsRepository } from "../statisticsRepository";
import { createConnection } from "../../infra/database/connection";
import { Statistics } from "../../entities/statistics";

export class PostgresStatisticsRepository implements StatisticsRepository {
  private client: Pool;

  private async ensureConnection() {
    if (!this.client) {
      this.client = await createConnection();
    }
  }

  async countOrders(restaurantId: string): Promise<Statistics<number>> {
    await this.ensureConnection();

    const query = `
      SELECT
        COUNT(*) AS "totalOrders" 
      FROM
        orders
      WHERE
        restaurant_id = $1;
    `;

    const result = await this.client.query(query, [restaurantId]);

    const statistic: Statistics<number> = result.rows[0];

    return statistic;
  }

  async countOrdersOnTheDay(restaurantId: string): Promise<Statistics<number>> {
    await this.ensureConnection();

    const query = `
      SELECT 
        COUNT(*) AS "totalOrders" 
      FROM 
        orders 
      WHERE
        restaurant_id = $1
        AND created_at > current_date;
    `;

    const result = await this.client.query(query, [restaurantId]);

    const statistic: Statistics<number> = result.rows[0];

    return statistic;
  }

  async totalAmount(restaurantId: string): Promise<Statistics<number>> {
    await this.ensureConnection();

    const query = `
      SELECT
        SUM(amount) as "totalAmount"
      FROM
        orders
      WHERE
        restaurant_id = $1;
    `;

    const result = await this.client.query(query, [restaurantId]);

    const statistic: Statistics<number> = result.rows[0];

    return statistic;
  }

  async totalAmountOnPeriod(
    startDate: Date,
    finalDate: Date,
    restaurantId: string
  ): Promise<Statistics<number>> {
    await this.ensureConnection();

    const query = `
      SELECT
        SUM(amount) as "totalAmount"
      FROM
        orders
      WHERE
        restaurant_id = $1
        AND created_at BETWEEN $2 AND $3;
    `;

    const values = [restaurantId, startDate, finalDate];

    const result = await this.client.query(query, values);

    const statistic: Statistics<number> = result.rows[0];

    return statistic;
  }

  async countMorePopularsItems(
    restaurantId: string
  ): Promise<Statistics<number>[]> {
    await this.ensureConnection();

    const query = `
      SELECT
        i.name,
        SUM(oi.quantity) AS "totalDeliveredItems"
      FROM
        order_items oi
      JOIN
        items i ON oi.item_id = i.id
      JOIN
        restaurants r ON i.user_id = r.user_id
      WHERE
        r.id = $1
      GROUP BY
        i.name
      ORDER BY
        "totalDeliveredItems" DESC;
    `;

    const result = await this.client.query(query, [restaurantId]);

    const statistics: Statistics<number>[] = result.rows;

    return statistics;
  }
}
