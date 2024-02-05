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

  constructor(userId: string, birthDateStr: string, isActive: boolean = true) {
    if (!this.id) {
      this.id = createId();
    }

    if (birthDateStr) {
      const [day, month, year] = birthDateStr.split("/").map(Number);
      this.birthDate = new Date(year, month - 1, day);
    } else {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      this.birthDate = currentDate;
    }

    this.isActive = isActive;

    this.userId = userId;
  }
}
