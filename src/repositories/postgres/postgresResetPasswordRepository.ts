import { Pool } from "pg";
import { ResetPassword } from "../../entities/resetPassword";
import { ResetPasswordRepository } from "./../resetPasswordRepository";
import { createConnection } from "../../infra/database/connection";

export class PostgresResetPasswordRepository
  implements ResetPasswordRepository
{
  private client: Pool;

  private async ensureConnection() {
    if (!this.client) {
      this.client = await createConnection();
    }
  }

  async generate({
    id,
    token,
    expiresIn,
    userId,
  }: ResetPassword): Promise<void> {
    await this.ensureConnection();

    const query = `
    INSERT INTO reset_password (id, token, expires_in, user_id)
    VALUES ($1, $2, $3, $4);
    `;

    const values = [id, token, expiresIn, userId];

    await this.client.query(query, values);
  }

  async findById(id: string): Promise<ResetPassword | null> {
    await this.ensureConnection();

    const query = `
    SELECT * FROM reset_password
    WHERE id = $1
    `;

    const values = [id];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const resetPassword: ResetPassword = result.rows[0];
      return resetPassword;
    } else {
      return null;
    }
  }

  async findByToken(token: string): Promise<ResetPassword | null> {
    await this.ensureConnection();

    const query = `
    SELECT * FROM reset_password
    WHERE token = $1
    `;

    const values = [token];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const resetPassword: ResetPassword = result.rows[0];
      return resetPassword;
    } else {
      return null;
    }
  }

  async findByUserId(userId: string): Promise<ResetPassword | null> {
    await this.ensureConnection();

    const query = `
    SELECT * FROM reset_password
    WHERE user_id = $1
    `;

    const values = [userId];

    const result = await this.client.query(query, values);

    if (result.rows.length > 0) {
      const resetPassword: ResetPassword = result.rows[0];
      return resetPassword;
    } else {
      return null;
    }
  }

  async findIndex(id: string): Promise<number> {
    await this.ensureConnection();

    const query = "SELECT * FROM reset_password";
    const result = await this.client.query(query);

    const index = result.rows.findIndex(
      (resetPassword) => resetPassword.id === id
    );

    if (index < 0) return -1;

    return index;
  }

  async delete(userId: string): Promise<void> {
    await this.ensureConnection();

    const query = `
    DELETE FROM reset_password
    WHERE user_id = $1
    `;

    const values = [userId];

    await this.client.query(query, values);
  }
}
