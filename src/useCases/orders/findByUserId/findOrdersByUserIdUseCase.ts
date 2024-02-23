import { ItemsRepository } from "./../../../repositories/itemsRepository";
import { CustomersRepository } from "./../../../repositories/customersRepository";
import { EnumDeliveryStatus, EnumPaymentType } from "../../../entities/order";
import { OrderItemsRepository } from "../../../repositories/orderItemsRepository";
import { OrdersRepository } from "../../../repositories/ordersRepository";
import { CustomError } from "../../../utils/customError";

interface FindOrdersByUserIdRequest {
  userId: string;
}

type FindOrdersByUserIdResponse =
  | {
      id: string;
      address: string;
      amount: number;
      paymentType: EnumPaymentType;
      deliveryStatus: EnumDeliveryStatus;
      userId: string;
      restaurantId: string;
      customer: {
        customerId: string;
        name: string;
      };
      orderItems: {
        quantity: number;
        notes: string;
        itemId: string;
        item: string;
        amount: number;
      }[];
    }[]
  | CustomError;

export class FindOrdersByUserIdUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemsRepository: OrderItemsRepository,
    private customersRepository: CustomersRepository,
    private itemsRepository: ItemsRepository
  ) {}

  async execute({
    userId,
  }: FindOrdersByUserIdRequest): Promise<FindOrdersByUserIdResponse> {
    if (userId.trim() === "") {
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );
    }

    const orders = await this.ordersRepository.findByUserId(userId);

    if (!orders) {
      return new CustomError(false, "Pedidos não encontrados", 404);
    }

    const ordersWithItems: {
      id: string;
      address: string;
      amount: number;
      paymentType: EnumPaymentType;
      deliveryStatus: EnumDeliveryStatus;
      userId: string;
      restaurantId: string;
      customer: {
        customerId: string;
        name: string;
      };
      orderItems: {
        quantity: number;
        notes: string;
        itemId: string;
        item: string;
        amount: number;
      }[];
    }[] = [];

    for (const order of orders) {
      const orderItems = await this.orderItemsRepository.findByOrderId(
        order.id
      );

      if (!orderItems) {
        return new CustomError(false, "Itens do pedido não encontrados", 404);
      }

      const customer = await this.customersRepository.findById(
        order.customerId
      );

      if (!customer) {
        return new CustomError(false, "Cliente do pedido não encontrados", 404);
      }

      const itemsOfOrder: {
        quantity: number;
        notes: string;
        itemId: string;
        item: string;
        amount: number;
      }[] = [];

      await Promise.all(
        orderItems.map(async (item) => {
          const itemDetails = await this.itemsRepository.findById(item.itemId);

          if (!itemDetails)
            return new CustomError(false, "Item não encontrado", 404);

          itemsOfOrder.push({
            quantity: item.quantity,
            notes: item.notes,
            itemId: item.itemId,
            item: itemDetails.name,
            amount: itemDetails.priceInCents * item.quantity,
          });
        })
      );

      ordersWithItems.push({
        id: order.id,
        address: order.address,
        amount: order.amount,
        paymentType: order.paymentType,
        deliveryStatus: order.deliveryStatus,
        userId: order.userId,
        restaurantId: order.restaurantId,
        customer: { customerId: order.customerId, name: customer.name },
        orderItems: itemsOfOrder,
      });
    }

    return ordersWithItems;
  }
}
