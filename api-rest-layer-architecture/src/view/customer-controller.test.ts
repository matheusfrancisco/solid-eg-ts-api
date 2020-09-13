import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;
import { ServiceError } from '../service-error';
import { buildCustomerController } from './customer-controller';
import CustomerService from '../application/customer-service';
import { CustomerResource } from '../application/customer-service';
import { CountryFactory } from '../domain/customer/country';
import { CustomerRepository } from '../domain/customer/customer-repository';
import { CustomerEntity } from '../infrastructure/entity/customer-entity';

describe('CustomerController', () => {
  let createCustomer: sinon.SinonSpy;
  let createCustomerMock: (name: string, email: string, password: string) => Promise<void>;
  let updateFullNameMock: (
    email: string,
    token: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  let updateTaxpayerRegistryMock: (email: string, cpf: string) => Promise<void>;
  let customerController: any;
  let customerControllerDelegated: any;
  let failingCustomerController: any;
  let failingForUnknownReasonsCustomerController: any;
  let end: any;
  let statusReturnMock: any;
  let status: any;
  let resMock: any;
  let json: any;
  let resMockSuccess: any;
  let createToken: any;
  let createCustomertest: any;
  let updateFullName: any;
  let updatedBirthday: any;
  let updateTaxpayerRegistry: any;

  const customerEmail = 'matheusmachadoufsc@gmail.com';

  const customerTaxpayerRegistry = '30330322210';
  const customerCountryCode = 'BR';
  const userPass = '123123';
  const expectedCustomer = [
    {
      id: 1,
      email: 'matheusmachadoufsc@hotmail.com',
      password: 'ee65426e-b376-4221-931b-994913e17b73',
    },
  ];
  const req = {
    body: {
      email: customerEmail,
      password: userPass,
    },
  };
  const reqWithoutEmail = { body: { password: userPass } };
  const reqWithoutPass = { body: { email: customerEmail } };

  const customerRepository = {
    save: () => Promise.resolve(),
    updateFullName: () => Promise.resolve(),
    findByEmail: (): Promise<CustomerEntity | undefined> => Promise.resolve(),
    update: () => Promise.resolve(),
  };

  const amountRepository = {
    save: () => Promise.resolve(),
  };

  const promiseThatThrows = () => {
    throw new Error('Unknown error');
  };

  interface CreateServiceReturn {
    token: string;
    email: string;
  }

  class CustomerServiceMock extends CustomerService {
    constructor(
      customerRepository: CustomerRepository,
      amountRepository: AmountRepository,
      countryFactory: CountryFactory,
      createCustomer: (email: string, password: string) => Promise<void>,
      updateTaxpayerRegistry: (email: string, cpf: string, countryCode: string) => Promise<any>,
      updateFullName: (email: string, firstName: string, lastName: string) => Promise<void>,
    ) {
      super(customerRepository, amountRepository, countryFactory);
      this.createCustomer = createCustomer;
      this.updateTaxpayerRegistry = updateTaxpayerRegistry;
      this.updateFullName = updateFullName;
    }
  }

  beforeEach(() => {
    createCustomer = sinon.spy();
    createCustomertest = jest.fn();
    createCustomertest.mockReturnValue({ token: 'test', email: 'test' });

    createCustomerMock = (name: string, email: string, password: string) => {
      return Promise.resolve(createCustomer(name, email, password));
    };

    updateFullName = sinon.spy();
    updateFullNameMock = (email: string, firstName: string, lastName: string) => {
      return Promise.resolve(updateFullName(email, firstName, lastName));
    };
    updateTaxpayerRegistry = sinon.spy();
    updateTaxpayerRegistryMock = (email: string, cpf: string) => {
      return Promise.resolve(updateFullName(email, cpf));
    };

    updatedBirthday = sinon.spy();

    customerController = buildCustomerController(
      new CustomerServiceMock(
        customerRepository,
        amountRepository,
        new CountryFactory(),
        createCustomertest,
        updateTaxpayerRegistry,
        updateFullName,
      ),
    );

    customerControllerDelegated = buildCustomerController(
      new CustomerServiceMock(
        customerRepository,
        amountRepository,
        new CountryFactory(),
        createCustomer,
        updateTaxpayerRegistry,
        updateFullName,
      ),
    );
    failingCustomerController = buildCustomerController(
      new CustomerServiceMock(
        customerRepository,
        amountRepository,
        new CountryFactory(),
        () => {
          throw new ServiceError('Service error');
        },
        () => {
          throw new ServiceError('Service error');
        },
        () => {
          throw new ServiceError('Service error');
        },
      ),
    );
    failingForUnknownReasonsCustomerController = buildCustomerController(
      new CustomerServiceMock(
        customerRepository,
        amountRepository,
        new CountryFactory(),
        promiseThatThrows,
        promiseThatThrows,
        promiseThatThrows,
      ),
    );
    end = sinon.spy();
    json = sinon.spy();
    statusReturnMock = { end, json };
    status = sinon.spy(() => statusReturnMock);
    resMock = { status };
    resMockSuccess = { status, json };
  });

  describe('POST create-customer', () => {
    it('Should receive name and email and password and delegate to application layer', async () => {
      await customerControllerDelegated.post(req, resMockSuccess);
      expect(createCustomer).to.have.been.calledWith(customerEmail, userPass);
    });

    it('Should return status code 201', async () => {
      const r = await customerController.post(req, resMockSuccess);
      expect(status).to.have.been.calledWith(201);
      expect(r.json).to.have.been.called;
      expect(end).to.have.been.called;
    });

    it('Should return status code 400 if email is not present post createCustomer', async () => {
      await customerController.post(reqWithoutEmail, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should return status code 400 if pass is not present', async () => {
      await customerController.post(reqWithoutPass, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should return status code 400 if error thrown', async () => {
      await failingCustomerController.post(req, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Service error' });
    });

    it('Should return status code 400 if body is empty', async () => {
      await customerController.post({}, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Shoud return status 500 if exception is unknow', () => {
      expect(failingForUnknownReasonsCustomerController.post(req, resMock)).to.not.eventually.throw;
      expect(status).to.have.been.calledWith(500);
    });
  });

  describe('POST /api/v1/full-name', () => {
    it('Should return status code 400 if firstname is not present', async () => {
      const body = { lastName: 'Xico' };
      const reqWithoutEmail = { body, token: 'fake-data' };

      await customerController.updateFullName(reqWithoutEmail, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should return status code 400 if lastname is not present', async () => {
      const body = { lastName: 'Xico' };
      const reqWithoutToken = { body };
      await customerController.updateFullName(reqWithoutToken, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should receive lastname and firstName and delegate to application layer', async () => {
      const body = { email: 'matheus@hotmail', firstName: 'Matheus', lastName: 'Xico' };
      const reqSuccess = { body };
      await customerControllerDelegated.updateFullName(reqSuccess, resMockSuccess);
      expect(updateFullName).to.have.been.calledWith(
        reqSuccess.body.email,
        reqSuccess.body.firstName,
        reqSuccess.body.lastName,
      );
    });
  });

  describe('POST /api/v1/taxpayer-registry', () => {
    it('Should return status code 400 if taxpayer registry is not present', async () => {
      const body = {};
      const reqWithoutEmail = { body, token: 'fake-data' };

      await customerController.updateTaxpayerRegistry(reqWithoutEmail, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should return status code 400 if countryCode registry is not present', async () => {
      const body = { cpf: '56282681006' };
      const reqWithoutEmail = { body, token: 'fake-data' };

      await customerController.updateTaxpayerRegistry(reqWithoutEmail, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should receive cpf and contryCode and delegate to application layer', async () => {
      const body = { email: 'matheus@hotmail', cpf: '56282681006', countryCode: 'BR' };
      const reqSuccess = { body };
      await customerControllerDelegated.updateTaxpayerRegistry(reqSuccess, resMockSuccess);
      expect(updateTaxpayerRegistry).to.have.been.calledWith(
        reqSuccess.body.email,
        reqSuccess.body.cpf,
        reqSuccess.body.countryCode,
      );
    });
  });
});
