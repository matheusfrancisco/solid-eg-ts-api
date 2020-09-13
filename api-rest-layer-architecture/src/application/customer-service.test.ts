import sinon from 'sinon';
import CustomerService from './customer-service';
import Customer from '../domain/customer/customer';
import { countries } from '../domain/customer/country';
import TaxpayerRegistry from '../domain/customer/taxpayer-registry';

describe('CustomerService', () => {
  let repositoryCustomer: any;
  xit('should save customer with CustomerRespository', () => {
    const save = sinon.spy();
    const findByEmail = sinon.spy();
    const update = sinon.spy();
    const updateFullName = sinon.spy();
    const buildCountry = sinon.fake.returns(countries.US);
    const countryFactory = { buildCountry };

    const customerService = new CustomerService(
      { save, findByEmail, updateFullName, update },
      countryFactory,
    );
    customerService.createCustomer('matheusfrancisco@hotmail.com', '123123');
    expect(save.called).toBeTruthy();
    expect(save.args[0][0] instanceof Customer).toBeTruthy();
    expect(save.args[0][0].email.value).toEqual('matheusfrancisco@hotmail.com');
  });

  xit('should  called and update, findbyEmail when updateTaxpayerRegistry is called', async () => {
    const buildCountry = sinon.fake.returns(countries.BR);
    const countryFactory = { buildCountry };
    const customer = {
      id: 11,
      email: 'xico@hotmail.com',
      password: '123',
      taxpayerRegistry: null,
      countryCode: null,
      nextEndpoint: '/api/v1/taxpayer-registry',
    };

    repositoryCustomer = {
      save: sinon.spy(),
      findByEmail: jest.fn().mockReturnValue(customer),
      updateFullName: sinon.spy(),
      update: jest.fn().mockReturnValue({}),
    };

    const taxpayerResgitry = new TaxpayerRegistry('56282681006', countries.BR);

    const customerDomain = new Customer({
      ...customer,
    });
    customerDomain.updateTaxpayerRegistry(taxpayerResgitry);
    const customerService = new CustomerService(repositoryCustomer, countryFactory);

    customerService.updateTaxpayerRegistry('matheusfrancisco@hotmail.com', '56282681006', 'BR');
    expect(repositoryCustomer.findByEmail).toHaveBeenCalled();
  });
});
