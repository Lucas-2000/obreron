import { ItemsRepository } from "./../../../repositories/itemsRepository";
import { CustomError } from "./../../../utils/customError";

interface UpdateItemRequest {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  available: boolean;
  preparationTime: number;
  ingredients: string[];
}

type UpdateItemResponse =
  | {
      name: string;
      description: string;
      priceInCents: number;
      available: boolean;
      preparationTime: number;
      ingredients: string[];
    }
  | CustomError;

export class UpdateItemUseCase {
  constructor(private itemsRepository: ItemsRepository) {}

  async execute({
    id,
    name,
    description,
    priceInCents,
    available,
    preparationTime,
    ingredients,
  }: UpdateItemRequest): Promise<UpdateItemResponse> {
    if (
      id.trim() === "" ||
      name.trim() === "" ||
      description.trim() === "" ||
      priceInCents === null ||
      available === null ||
      preparationTime === null ||
      ingredients.length === 0
    )
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const itemExists = await this.itemsRepository.findById(id);

    if (!itemExists) return new CustomError(false, "Item não encontrado", 404);

    await this.itemsRepository.update({
      id,
      name,
      description,
      priceInCents,
      available,
      preparationTime,
      ingredients,
      userId: itemExists.userId,
    });

    return {
      name,
      description,
      priceInCents,
      available,
      preparationTime,
      ingredients,
    };
  }
}
