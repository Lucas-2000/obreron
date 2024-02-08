import { createId } from "@paralleldrive/cuid2";

export enum EnumPaymentType {
  CREDIT_CARD = "Cartão de crédito",
  DEBIT_CARD = "Cartão de débito",
  PIX = "Pix",
  MONEY = "Dinheiro",
}

export enum EnumDeliveryStatus {
  PENDING = "Pendente",
  PREPARING = "Preparando",
  DELIVERED = "Enviado",
  SHIPPED = "Entregue",
}

export class Order {
  id: string;
  address: string;
  amount: number;
  paymentType: EnumPaymentType;
  deliveryStatus: EnumDeliveryStatus;
  userId: string;
  restaurantId: string;
  customerId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(userId: string, restaurantId: string, customerId: string) {
    if (!this.id) {
      this.id = createId();
    }

    this.userId = userId;
    this.restaurantId = restaurantId;
    this.customerId = customerId;
  }
}
