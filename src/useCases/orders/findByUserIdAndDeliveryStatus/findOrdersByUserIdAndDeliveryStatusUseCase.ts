import { EnumDeliveryStatus, EnumPaymentType } from "../../../entities/order";
import { OrderItemsRepository } from "../../../repositories/orderItemsRepository";
import { OrdersRepository } from "../../../repositories/ordersRepository";
import { CustomError } from "../../../utils/customError";

interface FindOrdersByUserIdAndDeliveryStatusRequest {
  userId: string;
  deliveryStatus: EnumDeliveryStatus;
}

type FindOrdersByUserIdAndDeliveryStatusResponse =
  | {
      id: string;
      address: string;
      amount: number;
      paymentType: EnumPaymentType;
      deliveryStatus: EnumDeliveryStatus;
      userId: string;
      restaurantId: string;
      customerId: string;
      orderItems: {
        quantity: number;
        notes: string;
        itemId: string;
      }[];
    }[]
  | CustomError;

export class FindOrdersByUserIdAndDeliveryStatusUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private orderItemsRepository: OrderItemsRepository
  ) {}

  async execute({
    userId,
    deliveryStatus,
  }: FindOrdersByUserIdAndDeliveryStatusRequest): Promise<FindOrdersByUserIdAndDeliveryStatusResponse> {
    if (userId.trim() === "" || deliveryStatus.trim() === "") {
      return new CustomError(
        false,
        "Preencha todos os campos obrigatórios",
        400
      );
    }

    const validDeliveryStatus: string[] = Object.values(EnumDeliveryStatus);

    if (!validDeliveryStatus.includes(deliveryStatus))
      return new CustomError(false, "Status inválido", 404);

    const orders = await this.ordersRepository.findByUserIdAndDeliveryStatus(
      userId,
      deliveryStatus
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
      customerId: string;
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

      ordersWithItems.push({
        id: order.id,
        address: order.address,
        amount: order.amount,
        paymentType: order.paymentType,
        deliveryStatus: order.deliveryStatus,
        userId: order.userId,
        restaurantId: order.restaurantId,
        customerId: order.customerId,
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
