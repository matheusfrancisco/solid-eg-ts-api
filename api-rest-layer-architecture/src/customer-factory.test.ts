import { CustomerRepository } from './domain/customer/customer-repository';
import { AppFactory } from './app-factory';
import { MemoryCustomerRepository } from './infrastructure/memory-customer-repository';
import { PostgresCustomerRepository } from './infrastructure/postgres-customer-repository';

describe('Fintop Factory', () => {
  it('Should build application in test mode', async () => {
    const container = await AppFactory.build('test');
    const controller = container.customerController as any;
    const service = container.customerService as any;
    const repository = service.customerRepository as CustomerRepository;

    expect(repository).toBeInstanceOf(MemoryCustomerRepository);
    expect(container.customerRepository).toBeInstanceOf(MemoryCustomerRepository);
  });

  it('Should build application in production mode', async () => {
    const container = await AppFactory.build();
    const controller = container.customerController as any;
    const service = container.customerService as any;
    const repository = service.customerRepository as CustomerRepository;

    expect(repository).toBeInstanceOf(PostgresCustomerRepository);
    expect(container.customerRepository).toBeInstanceOf(PostgresCustomerRepository);
  });
});
