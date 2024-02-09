import { ItemsRepository } from "./../../../repositories/itemsRepository";
import { OrderItemsRepository } from "./../../../repositories/orderItemsRepository";
import { CustomersRepository } from "./../../../repositories/customersRepository";
import { UsersRepository } from "./../../../repositories/usersRepository";
import { RestaurantsRepository } from "./../../../repositories/restaurantsRepository";
import { OrdersRepository } from "./../../../repositories/ordersRepository";
import { CustomError } from "./../../../utils/customError";
import {
  EnumDeliveryStatus,
  EnumPaymentType,
  Order,
} from "../../../entities/order";
import { OrderItem } from "../../../entities/orderItem";
import { createId } from "@paralleldrive/cuid2";

interface CreateOrderRequest {
  address: string;
  amount: number;
  paymentType: EnumPaymentType;
  deliveryStatus: EnumDeliveryStatus;
  userId: string;
  restaurantId: string;
  customerId: string;
  orderItems: OrderItem[];
}

type CreateOrderResponse = void | CustomError;

export class CreateOrderUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private usersRepository: UsersRepository,
    private restaurantsRepository: RestaurantsRepository,
    private customersRepository: CustomersRepository,
    private itemsRepository: ItemsRepository,
    private orderItemsRepository: OrderItemsRepository
  ) {}

  async execute({
    address,
    amount,
    paymentType,
    deliveryStatus,
    userId,
    restaurantId,
    customerId,
    orderItems,
  }: CreateOrderRequest): Promise<CreateOrderResponse> {
    if (
      address.trim() === "" ||
      amount === null ||
      paymentType === null ||
      deliveryStatus === null ||
      userId.trim() === "" ||
      restaurantId.trim() === "" ||
      customerId.trim() === "" ||
      orderItems.length === 0
    )
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );

    const userExists = await this.usersRepository.findById(userId);

    if (!userExists)
      return new CustomError(false, "Usuário não encontrado", 404);

    const restaurantExists = await this.restaurantsRepository.findById(
      restaurantId
    );

    if (!restaurantExists)
      return new CustomError(false, "Restaurante não encontrado", 404);

    const customerExists = await this.customersRepository.findById(customerId);

    if (!customerExists)
      return new CustomError(false, "Cliente não encontrado", 404);

    const validPaymentType: string[] = Object.values(EnumPaymentType);

    if (!validPaymentType.includes(paymentType))
      return new CustomError(false, "Tipo de pagamento inválido", 404);

    const validDeliveryStatus: string[] = Object.values(EnumDeliveryStatus);

    if (!validDeliveryStatus.includes(deliveryStatus))
      return new CustomError(false, "Status inválido", 404);

    const order = new Order(userId, restaurantId, customerId);
    order.id = createId();
    order.address = address;
    order.amount = amount;
    order.deliveryStatus = deliveryStatus;
    order.paymentType = paymentType;

    await this.ordersRepository.create(order);

    await Promise.all(
      orderItems.map(async (oItem) => {
        const itemExists = await this.itemsRepository.findById(oItem.itemId);

        if (!itemExists)
          return new CustomError(false, "Item não encontrado", 404);

        const orderItem = new OrderItem(oItem.itemId, order.id);
        orderItem.notes = oItem.notes;
        orderItem.quantity = oItem.quantity;

        await this.orderItemsRepository.create(orderItem);
      })
    );
  }
}
