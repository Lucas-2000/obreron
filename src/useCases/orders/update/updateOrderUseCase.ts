import { EnumDeliveryStatus, EnumPaymentType } from "../../../entities/order";
import { OrderItem } from "../../../entities/orderItem";
import { CustomersRepository } from "../../../repositories/customersRepository";
import { ItemsRepository } from "../../../repositories/itemsRepository";
import { OrderItemsRepository } from "../../../repositories/orderItemsRepository";
import { OrdersRepository } from "../../../repositories/ordersRepository";
import { CustomError } from "../../../utils/customError";

interface UpdateOrderRequest {
  id: string;
  address: string;
  paymentType: EnumPaymentType;
  deliveryStatus: EnumDeliveryStatus;
  customerId: string;
  orderItems: OrderItem[];
}

type UpdateOrderResponse =
  | {
      address: string;
      paymentType: EnumPaymentType;
      deliveryStatus: EnumDeliveryStatus;
      customerId: string;
      orderItems: OrderItem[];
    }
  | CustomError;

export class UpdateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemsRepository: OrderItemsRepository,
    private customersRepository: CustomersRepository,
    private itemsRepository: ItemsRepository
  ) {}

  async execute({
    id,
    address,
    paymentType,
    deliveryStatus,
    customerId,
    orderItems,
  }: UpdateOrderRequest): Promise<UpdateOrderResponse> {
    if (
      address.trim() === "" ||
      paymentType === null ||
      deliveryStatus === null ||
      orderItems.length === 0
    )
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const orderExists = await this.ordersRepository.findById(id);

    if (!orderExists)
      return new CustomError(false, "Pedido não encontrado", 404);

    const customerExists = await this.customersRepository.findById(customerId);

    if (!customerExists)
      return new CustomError(false, "Cliente não encontrado", 404);

    let amount = 0;

    for (const oItem of orderItems) {
      const itemExists = await this.itemsRepository.findById(oItem.itemId);

      if (!itemExists)
        return new CustomError(false, "Item não encontrado", 404);

      const orderItemExists = await this.orderItemsRepository.findByOrderId(id);

      if (!orderItemExists)
        return new CustomError(false, "Itens da ordem não encontrado", 404);

      for (const oItemExists of orderItemExists) {
        await this.orderItemsRepository.delete(oItemExists.id);
      }

      const orderItem = new OrderItem(oItem.itemId, id);
      orderItem.notes = oItem.notes;
      orderItem.quantity = oItem.quantity;

      amount += oItem.quantity * itemExists.priceInCents;

      await this.orderItemsRepository.create(orderItem);
    }

    await this.ordersRepository.update({
      id,
      address,
      paymentType,
      deliveryStatus,
      amount,
      customerId,
      userId: orderExists.userId,
      restaurantId: orderExists.restaurantId,
    });

    return {
      address,
      paymentType,
      deliveryStatus,
      customerId,
      orderItems,
    };
  }
}
