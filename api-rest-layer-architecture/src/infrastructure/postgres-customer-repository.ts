import { CustomerRepository } from 'src/domain/customer/customer-repository';
import { CustomerEntity } from './entity/customer-entity';
import { Connection, getRepository } from 'typeorm';
import Customer from '../domain/customer/customer';

export class PostgresCustomerRepository implements CustomerRepository {
  constructor(public connection: Connection) {}
  public async save({ email, password }: Customer): Promise<void> {
    const entity = {
      email: email.value,
      password: password,
    };
    await getRepository(CustomerEntity).save(entity);
  }

  public async findByEmail(email: string): Promise<CustomerEntity | undefined> {
    const userRepository = await getRepository(CustomerEntity).findOne({ email });
    if (userRepository) {
      return userRepository;
    }
  }

  public async updateFullName(customer: Customer, id: number): Promise<any> {
    const { email, password } = customer;
    const entity = {
      id,
      email: email.value,
      password,
      lastName: customer.lastName,
      firstName: customer.firstName,
    };
    return await getRepository(CustomerEntity).preload(entity);
  }

  public async update(customer: Customer, id: number): Promise<any> {
    const customerRepository = customer.toRepository();
    return await getRepository(CustomerEntity).update(id, customerRepository);
  }
}
