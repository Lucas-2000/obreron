import { ItemsRepository } from "./../../../repositories/itemsRepository";
import { CustomError } from "../../../utils/customError";

interface FindItemsByUserIdRequest {
  userId: string;
}

type FindItemsByUserIdResponse =
  | {
      id: string;
      name: string;
      description: string;
      priceInCents: number;
      available: boolean;
      preparationTime: number;
      ingredients: string[];
    }[]
  | CustomError;

export class FindItemsByUserIdUseCase {
  constructor(private itemsRepository: ItemsRepository) {}

  async execute({
    userId,
  }: FindItemsByUserIdRequest): Promise<FindItemsByUserIdResponse> {
    if (userId.trim() === "")
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const items = await this.itemsRepository.findByUserId(userId);

    if (!items) return new CustomError(false, "Item não encontrado", 404);

    const itemsResponse = items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        priceInCents: item.priceInCents,
        available: item.available,
        preparationTime: item.preparationTime,
        ingredients: item.ingredients,
      };
    });

    return itemsResponse;
  }
}
