import Customer from '../domain/customer/customer';
import { MemoryCustomerRepository } from './memory-customer-repository';

describe('Memory Customer Repository', () => {
  let customerRepository: MemoryCustomerRepository;

  beforeEach(async () => {
    customerRepository = new MemoryCustomerRepository();
  });

  it('Should save a customer ', async () => {
    const customer = new Customer({ email: 'matheus@hotmxil.com', password: '123123' });
    await customerRepository.save(customer);
    const foundCustomer = customerRepository.customers[0];
    expect(foundCustomer).toEqual(customer);
  });

  it('Should save two customer with same email', async () => {
    const customer = new Customer({ email: 'matheus@hotmxil.com', password: '123123' });
    expect(async () => {
      await customerRepository.save(customer);
      await customerRepository.save(customer);
    }).toThrowError;
  });

  it('Should find customer by email', async () => {
    const customer = new Customer({ email: 'matheus@hotmxil.com', password: '123123' });
    await customerRepository.save(customer);
    const c = await customerRepository.findByEmail('matheus@hotmxil.com');
    expect(c[0].email.value).toEqual('matheus@hotmxil.com');
  });
});
