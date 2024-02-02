import { ItemsRepository } from "./../../../repositories/itemsRepository";
import { CustomError } from "../../../utils/customError";
import { UsersRepository } from "../../../repositories/usersRepository";
import { Item } from "../../../entities/item";

interface CreateItemRequest {
  name: string;
  description: string;
  priceInCents: number;
  available: boolean;
  preparationTime: number;
  ingredients: string[];
  userId: string;
}

type CreateItemResponse = void | CustomError;

export class CreateItemUseCase {
  constructor(
    private itemsRepository: ItemsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    description,
    priceInCents,
    available,
    preparationTime,
    ingredients,
    userId,
  }: CreateItemRequest): Promise<CreateItemResponse> {
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      priceInCents === null ||
      available === null ||
      preparationTime === null ||
      ingredients.length === 0 ||
      userId.trim() === ""
    )
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists)
      return new CustomError(false, "Usuário não encontrado", 404);

    const item = new Item(userId);
    item.name = name;
    item.description = description;
    item.priceInCents = priceInCents;
    item.available = available;
    item.preparationTime = preparationTime;
    item.ingredients = ingredients;

    await this.itemsRepository.create(item);
  }
}
