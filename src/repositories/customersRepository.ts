import { Customer } from "./../entities/customer";
export interface CustomersRepository {
  create(customer: Customer): Promise<void>;
  findById(id: string): Promise<Customer | null>;
  findByUserId(userId: string): Promise<Customer[] | null>;
  findIndex(id: string): Promise<number>;
  update(customer: Customer): Promise<void>;
  delete(id: string): Promise<void>;
}
