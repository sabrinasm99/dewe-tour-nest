import { Customer } from '../domain/customer.domain';

export interface CustomerRepository {
  insert(customer: Customer): Promise<void>;
  update(customer: Customer): Promise<void>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  delete(id: string): Promise<void>;
}
