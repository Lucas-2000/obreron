import { Customer } from "../../entities/customer";
import { CustomersRepository } from "../customersRepository";

export class InMemoryCustomersRepository implements CustomersRepository {
  private customers: Customer[] = [];

  async create(customer: Customer): Promise<void> {
    this.customers.push(customer);
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find((r) => r.id === id);

    return customer || null;
  }

  async findByUserId(userId: string): Promise<Customer[] | null> {
    const customers = this.customers.filter((r) => r.userId === userId);

    return customers.length > 0 ? customers : null;
  }

  async findIndex(id: string): Promise<number> {
    const index = this.customers.findIndex((r) => r.id === id);

    if (index < 0) return -1;

    return index;
  }

  async update(customer: Customer): Promise<void> {
    const customerToUpdate = this.customers.find((u) => u.id === customer.id);

    const updateDate = customer.updatedAt || new Date();

    if (customerToUpdate !== undefined) {
      Object.assign(customerToUpdate, {
        customer,
        updatedAt: updateDate,
      });
    }
  }

  async delete(id: string): Promise<void> {
    const customerIndex = this.customers.findIndex(
      (customer) => customer.id === id
    );

    if (customerIndex < 0) return;

    this.customers.splice(customerIndex, 1);
  }
}
