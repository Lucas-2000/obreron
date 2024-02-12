import { OrdersRepository } from "../../../repositories/ordersRepository";
import { CustomError } from "../../../utils/customError";

interface DeleteOrderRequest {
  id: string;
}

type DeleteOrderResponse = void | CustomError;

export class DeleteOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({ id }: DeleteOrderRequest): Promise<DeleteOrderResponse> {
    if (id.trim() === "")
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const orderExists = await this.ordersRepository.findById(id);

    if (!orderExists)
      return new CustomError(false, "Pedido não encontrado", 404);

    await this.ordersRepository.delete(id);
  }
}
