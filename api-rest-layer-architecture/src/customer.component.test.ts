import { AppFactory } from './app-factory';
import { MemoryCustomerRepository } from './infrastructure/memory-customer-repository';

describe('fintop', () => {
  it('should register a customer', async () => {
    const { customerController, customerRepository } = await AppFactory.build('test');
    const res = {
      status: () => ({ end: () => {} }),
      json: () => ({ email: 'xico@hotmail.com', token: 'fake-token' }),
    };

    const req = {
      body: {
        name: 'Xicolino',
        email: 'xico@hotmail.com',
        password: '123123',
      },
    };

    const _ = await customerController.post(req, res);
    expect((customerRepository as MemoryCustomerRepository).customers).toHaveLength(1);
  });

  it('should register a customer with a existing email', async () => {
    const { customerController } = await AppFactory.build('test');
    const res = {
      status: () => ({ end: () => {} }),
    };

    const req = {
      body: {
        name: 'Xicolino',
        email: 'xico@hotmail.com',
        password: '123123',
      },
    };

    expect(async () => {
      await customerController.post(req, res);
      await customerController.post(req, res);
    }).toThrowError;
  });
});
