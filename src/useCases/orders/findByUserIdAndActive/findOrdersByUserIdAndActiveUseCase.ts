import { EnumDeliveryStatus, EnumPaymentType } from "../../../entities/order";
import { CustomersRepository } from "../../../repositories/customersRepository";
import { OrderItemsRepository } from "../../../repositories/orderItemsRepository";
import { OrdersRepository } from "../../../repositories/ordersRepository";
import { CustomError } from "../../../utils/customError";

interface FindOrdersByUserIdAndActiveRequest {
  userId: string;
}

type FindOrdersByUserIdAndActiveResponse =
  | {
      id: string;
      address: string;
      amount: number;
      paymentType: EnumPaymentType;
      deliveryStatus: EnumDeliveryStatus;
      userId: string;
      restaurantId: string;
      customer: {
        name: string;
      };
      orderItems: {
        quantity: number;
        notes: string;
        itemId: string;
      }[];
    }[]
  | CustomError;

export class FindOrdersByUserIdAndActiveUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemsRepository: OrderItemsRepository,
    private customersRepository: CustomersRepository
  ) {}

  async execute({
    userId,
  }: FindOrdersByUserIdAndActiveRequest): Promise<FindOrdersByUserIdAndActiveResponse> {
    if (userId.trim() === "") {
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );
    }

    const orders = await this.ordersRepository.findByUserIdAndActive(
      userId,
      "Entregue"
    );

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
        name: string;
      };
      orderItems: {
        quantity: number;
        notes: string;
        itemId: string;
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

      ordersWithItems.push({
        id: order.id,
        address: order.address,
        amount: order.amount,
        paymentType: order.paymentType,
        deliveryStatus: order.deliveryStatus,
        userId: order.userId,
        restaurantId: order.restaurantId,
        customer: {
          name: customer.name,
        },
        orderItems: orderItems.map((item) => ({
          quantity: item.quantity,
          notes: item.notes,
          itemId: item.itemId,
        })),
      });
    }

    return ordersWithItems;
  }
}
