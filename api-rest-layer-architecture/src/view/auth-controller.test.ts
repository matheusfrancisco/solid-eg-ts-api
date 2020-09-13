import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(sinonChai);
const expect = chai.expect;
import { ServiceError } from '../service-error';
import { buildAuthController } from './auth-controller';
import AuthService from '../application/auth-service';
import { CustomerRepository } from '../domain/customer/customer-repository';
import { CustomerEntity } from '../infrastructure/entity/customer-entity';

describe('CustomerController', () => {
  let authController: any;
  let end: any;
  let statusReturnMock: any;
  let status: any;
  let resMock: any;
  let json: any;
  let resMockSuccess: any;

  //#TODO FIX TYPE FINDBYEMAIL
  const customerRepository = {
    save: () => Promise.resolve(),
    updateFullName: () => Promise.resolve(),
    findByEmail: (): Promise<CustomerEntity | undefined> => Promise.resolve(),
    update: () => Promise.resolve(),
  };

  const promiseThatThrows = () => {
    throw new Error('Unknown error');
  };

  class AuthServiceMock extends AuthService {
    constructor(
      customerRepository: CustomerRepository,
      singIn: (email: string, password: string) => Promise<string | null>,
    ) {
      super(customerRepository);
      this.singIn = singIn;
    }
  }

  let signIn: any;

  beforeEach(() => {
    signIn = sinon.spy();

    authController = buildAuthController(new AuthServiceMock(customerRepository, signIn));

    end = sinon.spy();
    json = sinon.spy();
    statusReturnMock = { end, json };
    status = sinon.spy(() => statusReturnMock);
    resMock = { status };
    resMockSuccess = { status, json };
  });

  describe('POST /api/v1/login', () => {
    it('Should return status code 400 if pass not pass', async () => {
      const body = { email: 'xico@hotmail.com' };
      const reqWithoutPass = { body };

      await authController.post(reqWithoutPass, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should return status code 400 if email not pass', async () => {
      const body = { password: '123123' };
      const reqWithoutPass = { body };

      await authController.post(reqWithoutPass, resMock);
      expect(status).to.have.been.calledWith(400);
      expect(json).to.have.been.calledWith({ error: 'Parameters missing' });
    });

    it('Should receive email and password and delegate to application layer', async () => {
      const body = { email: 'matheus@hotmail', password: '56282681006' };
      const reqSuccess = { body };
      await authController.post(reqSuccess, resMockSuccess);
      expect(signIn).to.have.been.calledWith(reqSuccess.body.email, reqSuccess.body.password);
    });
  });
});
