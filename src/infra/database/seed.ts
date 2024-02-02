import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";
import bcrypt from "bcrypt";
import { User } from "../../entities/User";
import { createConnection } from "./connection";
import { Items } from "../../entities/items";

const generateFakerUser = async () => {
  const users: User[] = [];

  for (let i = 0; i < 2; i++) {
    const id = createId();
    const username = faker.internet.userName().toLowerCase();
    const email = faker.internet.email().toLowerCase();
    const password = await bcrypt.hash("12345678", 10);

    users.push({
      id,
      username,
      email,
      password,
    });
  }

  return users;
};

const generateFakerItems = async () => {
  const items: Items[] = [];

  for (let i = 0; i < 20; i++) {
    const id = createId();
    const name = `Comida ${i}`;
    const description = faker.lorem.word({
      strategy: "shortest",
    });
    const priceInCents = faker.number.int({
      min: 1,
      max: 1800,
    });
    const available = true;
    const preparationTime = faker.number.int({
      min: 1,
      max: 40,
    });
    const ingredients = ["Ingrediente 1", "Ingrediente 2", "Ingrediente 3"];

    items.push({
      id,
      name,
      description,
      priceInCents,
      available,
      preparationTime,
      ingredients,
      userId: "pnaqoo7sqpxhzk8mmtk7ia1y",
    });
  }

  return items;
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

const seedItems = async () => {
  console.log("Iniciado seed items", new Date());

  const items = await generateFakerItems();

  const client = await createConnection();

  try {
    await client.connect();

    for (const item of items) {
      const query = `
        INSERT INTO items (id, name, description, price_in_cents, available, preparation_time, ingredients, user_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;

      const values = [
        item.id,
        item.name,
        item.description,
        item.priceInCents,
        item.available,
        item.preparationTime,
        item.ingredients,
        item.userId,
      ];

      await client.query(query, values);
    }

    console.log("Finalizado seed items", new Date());
  } catch (error) {
    console.error("Erro durante a inserção de items:", error);
  } finally {
    await client.end();
  }
};

seedUsers();
seedItems();
