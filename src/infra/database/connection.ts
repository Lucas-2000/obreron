import { Pool } from "pg";

const createConnection = async () => {
  const client = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    max: 20,
  });

  await client.connect();

  return client;
};

export { createConnection };
