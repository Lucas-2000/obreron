import { ItemsRepository } from "../../../repositories/itemsRepository";
import { CustomError } from "../../../utils/customError";

interface DeleteItemRequest {
  id: string;
}

type DeleteItemResponse = void | CustomError;

export class DeleteItemUseCase {
  constructor(private itemsRepository: ItemsRepository) {}

  async execute({ id }: DeleteItemRequest): Promise<DeleteItemResponse> {
    if (id.trim() === "")
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const itemExists = await this.itemsRepository.findById(id);

    if (!itemExists) return new CustomError(false, "Item não encontrado", 404);

    await this.itemsRepository.delete(id);
  }
}
