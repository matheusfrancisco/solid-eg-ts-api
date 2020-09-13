import { CustomerRepository } from '../domain/customer/customer-repository';
import Customer from '../domain/customer/customer';
import { getRepository, createConnection, Repository } from 'typeorm';
import { CustomerEntity } from './entity/customer-entity';
import { PostgresCustomerRepository } from './postgres-customer-repository';

describe('Customer Repository', () => {
  let repository: Repository<CustomerEntity>;
  let connection: any;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    connection = await createConnection();
    repository = getRepository(CustomerEntity);

    await repository.delete({});
    customerRepository = new PostgresCustomerRepository(connection);
  });

  it('Should save a customer', async () => {
    const customer = new Customer({ email: 'matheus@hotmaaxil.com', password: '123123' });
    await customerRepository.save(customer);
    const foundCustomer = await repository.findOne({ email: 'matheus@hotmaaxil.com' });
    expect(foundCustomer).toMatchObject({
      password: '123123',
      email: 'matheus@hotmaaxil.com',
    });
  });

  it('Should thorw duplicate email', async () => {
    const customer = new Customer({ email: 'matheus@hotmaaxil.com', password: '123123' });

    expect(async () => {
      await customerRepository.save(customer);
      await customerRepository.save(customer);
    }).toThrowError;
  });

  it('Should create tree customers and findall', async () => {
    const customer = new Customer({ email: 'matheus@hotmaaxil.com', password: '123123' });
    const customerXico = new Customer({ email: 'matheus@hotmaaxiffl.com', password: '123123' });
    const customerXicao = new Customer({ email: 'matheus@hotmaafffxil.com', password: '123123' });

    await customerRepository.save(customer);
    await customerRepository.save(customerXico);
    await customerRepository.save(customerXicao);
    const foundCustomer = await repository.find();
    expect(foundCustomer).toMatchObject([
      { email: 'matheus@hotmaaxil.com', password: '123123' },
      { email: 'matheus@hotmaaxiffl.com', password: '123123' },
      { email: 'matheus@hotmaafffxil.com', password: '123123' },
    ]);
  });

  it('Should find a customer using a repository', async () => {
    const customer = new Customer({ email: 'matheus@hotmaaxil.com', password: '123123' });
    await customerRepository.save(customer);
    const foundCustomer = await customerRepository.findByEmail('matheus@hotmaaxil.com');
    expect(foundCustomer).toMatchObject({
      password: '123123',
      email: 'matheus@hotmaaxil.com',
    });
  });

  it('Should find a customer using a repository', async () => {
    const customer = new Customer({ email: 'matheus@hotmaaxil.com', password: '123123' });
    await customerRepository.save(customer);
    const foundCustomer = await customerRepository.findByEmail('matheus@hotmaaxil.com');
    expect(foundCustomer).toMatchObject({
      password: '123123',
      email: 'matheus@hotmaaxil.com',
    });
  });

  afterEach(async () => {
    await repository.delete({});
    connection.close();
  });
});
