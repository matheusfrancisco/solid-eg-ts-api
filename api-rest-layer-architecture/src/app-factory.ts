import { MemoryCustomerRepository } from './infrastructure/memory-customer-repository';
import { PostgresCustomerRepository } from './infrastructure/postgres-customer-repository';
import CustomerService from './application/customer-service';
import AuthService from './application/auth-service';
import { buildCustomerController } from './view/customer-controller';
import { buildAuthController } from './view/auth-controller';
import { Connection, createConnection } from 'typeorm';
import { CustomerRepository } from './domain/customer/customer-repository';
import { CountryFactory } from './domain/customer/country';

//https://github.com/jeffijoe/awilix
export class AppFactory {
  private static connection: Connection;

  public static async build(config: string = 'prod') {
    let customerRepository: CustomerRepository;
    if (config === 'test') {
      customerRepository = new MemoryCustomerRepository();
    } else {
      customerRepository = new PostgresCustomerRepository(await this.createConnection());
    }
    const countryFactory = new CountryFactory();
    const authService = new AuthService(customerRepository);
    const customerService = new CustomerService(customerRepository, countryFactory);
    const customerController = buildCustomerController(customerService);
    const authController = buildAuthController(authService);
    return { customerController, customerService, customerRepository, authController };
  }

  public static async createConnection() {
    if (!this.connection) {
      this.connection = await createConnection();
    }
    return this.connection;
  }

  public static getConnection() {
    this.connection;
  }
}
