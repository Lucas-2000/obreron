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

  async countOrders(): Promise<Statistics<number>> {
    await this.ensureConnection();

    const query = `
    SELECT COUNT(*) AS total_orders FROM orders;
    `;

    const result = await this.client.query(query);

    const statistic: Statistics<number> = result.rows[0];

    return statistic;
  }

  async countOrdersOnTheDay(): Promise<Statistics<number>> {
    await this.ensureConnection();

    const query = `
    SELECT 
      COUNT(*) AS total_orders 
    FROM 
      orders 
    WHERE
      created_at > current_date;
    `;

    const result = await this.client.query(query);

    const statistic: Statistics<number> = result.rows[0];

    return statistic;
  }

  async totalAmount(): Promise<Statistics<number>> {
    await this.ensureConnection();

    const query = `
    SELECT
      SUM(amount) as "total_amount"
    FROM
     orders;
    `;

    const result = await this.client.query(query);

    const statistic: Statistics<number> = result.rows[0];

    return statistic;
  }

  async totalAmountOnPeriod(
    startDate: Date,
    finalDate: Date
  ): Promise<Statistics<number>> {
    await this.ensureConnection();

    const query = `
    SELECT
      SUM(amount) as "total_amount"
    FROM
     orders
    WHERE created_at BETWEEN $1 AND $2;
    `;

    const values = [startDate, finalDate];

    const result = await this.client.query(query, values);

    const statistic: Statistics<number> = result.rows[0];

    return statistic;
  }

  async countMorePopularsItems(): Promise<Statistics<number>> {
    await this.ensureConnection();

    const query = `
    SELECT
      i.name,
      COUNT(oi.item_id) AS total_orders
    FROM
      order_items oi
    JOIN
      items i ON oi.item_id = i.id
    GROUP BY
      i.name
    ORDER BY
      total_orders DESC;
    `;

    const result = await this.client.query(query);

    const statistic: Statistics<number> = result.rows[0];

    return statistic;
  }
}
