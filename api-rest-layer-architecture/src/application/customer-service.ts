import Customer from '../domain/customer/customer';
import { CustomerRepository } from '../domain/customer/customer-repository';
import TaxpayerRegistry from '../domain/customer/taxpayer-registry';
import { CountryCode, CountryFactory } from '../domain/customer/country';
import AddresService from '../domain/address/address-service';
import bcrypt from 'bcrypt';

export interface CustomerResource {
  id: number;
  name: string;
  email: string;
}

export const cryptPass = async (password: string) => {
  const hashPass = await bcrypt.hash(password, 8);
  return hashPass;
};
export default class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private countryFactory: CountryFactory,
  ) {}

  public async cryptPass(password: string) {
    const hashPass = await bcrypt.hash(password, 8);
    return hashPass;
  }
  async createCustomer(email: string, password: string) {
    try {
      const hashPass = await this.cryptPass(password);
      const user = new Customer({ email, password: hashPass });
      await this.customerRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async updateTaxpayerRegistry(email: string, taxpayer: string, countryCode: string) {
    const country = this.countryFactory.buildCountry(countryCode as CountryCode);
    const taxpayerResgitry = new TaxpayerRegistry(taxpayer, country);

    const customer = await this.customerRepository.findByEmail(email);
    if (customer) {
      const address = new AddresService({
        cep: customer.cep as string,
        city: customer.city as string,
        state: customer.state as string,
        address: customer.address as string,
        number: customer.number as number,
      });

      const customerDomain = new Customer({
        ...customer,
        countryCode,
        address,
      });

      customerDomain.updateTaxpayerRegistry(taxpayerResgitry);

      await this.customerRepository.update(customerDomain, customer.id);
      const customerUpdated = await this.customerRepository.findByEmail(email);
      return customerUpdated;
    }
  }

  async updateFullName(email: string, firstName: string, lastName: string): Promise<any> {
    try {
      const customer = await this.customerRepository.findByEmail(email);
      if (customer && customer.taxpayerRegistry) {
        const country = await this.countryFactory.buildCountry(customer.countryCode as CountryCode);
        const taxpayerRegistry = new TaxpayerRegistry(customer.taxpayerRegistry, country);
        const address = new AddresService({
          cep: customer.cep as string,
          city: customer.city as string,
          state: customer.state as string,
          address: customer.address as string,
          number: customer.number as number,
        });

        const customerDomain = new Customer({
          ...customer,
          taxpayerRegistry,
          address,
        });
        customerDomain.firstName = firstName;
        customerDomain.lastName = lastName;

        await this.customerRepository.update(customerDomain, customer.id);
        const customerUpdated = await this.customerRepository.findByEmail(email);

        return customerUpdated;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(
    email: string,
    address: string,
    cep: string,
    city: string,
    number: number,
    state: string,
  ) {
    const customer = await this.customerRepository.findByEmail(email);
    if (customer && customer.taxpayerRegistry) {
      const country = this.countryFactory.buildCountry(customer.countryCode as CountryCode);
      const taxpayerRegistry = new TaxpayerRegistry(customer.taxpayerRegistry, country);

      const customerDomain = new Customer({
        ...customer,
        taxpayerRegistry,
      });
      await customerDomain.updateAddres({
        address,
        cep,
        city,
        number,
        state,
      });

      await this.customerRepository.update(customerDomain, customer.id);
      const customerUpdated = await this.customerRepository.findByEmail(email);
      return customerUpdated;
    }
  }
}
