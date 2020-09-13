import Customer from 'src/domain/customer/customer';
import { CustomerRepository } from 'src/domain/customer/customer-repository';
import { ServiceError } from '../service-error';

export class MemoryCustomerRepository implements CustomerRepository {
  public readonly customers: Customer[] = [];

  public async save(customer: Customer) {
    const existingEmail = this.validateEmail(customer.email.value);
    if (existingEmail.length) {
      throw new ServiceError('duplicate email');
    }
    this.customers.push(customer);
  }

  private validateEmail(email: string) {
    const existingEmail = this.customers.filter(customer => customer.email.value === email);
    return existingEmail;
  }

  public async findByEmail(email: string): Promise<any | undefined> {
    return this.customers.filter(customer => customer.email.value === email);
  }

  public async updateFullName(customer: Customer): Promise<void> {
    throw Error('NOT IMPLEMENT YET');
  }

  public async update(customer: Customer): Promise<void> {
    throw Error('NOT IMPLEMENT YET');
  }
}
