import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";
import bcrypt from "bcrypt";
import { User } from "../entities/User";
import { createConnection } from "./connection";

const generateFakerUser = async () => {
  const users: User[] = [];

  for (let i = 0; i < 2; i++) {
    const id = createId();
    const username = faker.internet.userName().toLowerCase();
    const email = faker.internet.email().toLowerCase();
    const password = await bcrypt.hash("123456", 10);

    users.push({
      id,
      username,
      email,
      password,
    });
  }

  return users;
};

const seedUsers = async () => {
  console.log("Iniciado seed users", new Date());

  const users = await generateFakerUser();

  const client = await createConnection();

  try {
    await client.connect();

    for (const user of users) {
      const query = `
        INSERT INTO users (id, username, email, password)
        VALUES ($1, $2, $3, $4)
      `;

      const values = [user.id, user.username, user.email, user.password];

      await client.query(query, values);
    }

    console.log("Finalizado seed users", new Date());
  } catch (error) {
    console.error("Erro durante a inserção de usuários:", error);
  } finally {
    await client.end();
  }
};

seedUsers();
