import { createId } from "@paralleldrive/cuid2";

export enum EnumCustomerGender {
  MASCULINE = "M",
  FEMININE = "F",
}

export class Customer {
  id: string;
  name: string;
  birthDate: Date;
  phone: string;
  address: string;
  email: string;
  gender: EnumCustomerGender;
  isActive: boolean;
  observation?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(userId: string, isActive: boolean = true) {
    if (!this.id) {
      this.id = createId();
    }

    this.isActive = isActive;

    this.userId = userId;
  }
}
