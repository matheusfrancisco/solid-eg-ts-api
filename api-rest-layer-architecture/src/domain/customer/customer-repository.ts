import Customer from './customer';
import { CustomerEntity } from '../../infrastructure/entity/customer-entity';

export interface CustomerRepository {
  save: (customer: Customer) => Promise<void>;
  findByEmail: (email: string) => Promise<CustomerEntity | undefined>;
  updateFullName: (customer: Customer, id: number) => Promise<any>;
  update: (customer: Customer, id: number) => Promise<any>;
}
