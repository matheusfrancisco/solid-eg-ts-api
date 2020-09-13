import { AppFactory } from './app-factory';
import { factoryServer } from '../server';
import request from 'supertest';
import { createConnection, getRepository } from 'typeorm';
import { CustomerEntity } from './infrastructure/entity/customer-entity';

describe('integratoin test', () => {
  let server: any;
  let connection: any;
  let repositoryCustomerTest: any;

  beforeEach(async () => {
    let { customerController, authController } = await AppFactory.build('prod');

    server = factoryServer({
      customerController,
      authController,
    });

    connection = AppFactory.getConnection();
    repositoryCustomerTest = getRepository(CustomerEntity);
    await repositoryCustomerTest.delete({});
  });

  afterEach(async () => {
    await repositoryCustomerTest.delete({});
  });

  it('should register a customer with http call', async () => {
    const res = await request(server)
      .post('/api/v1/user')
      .send({
        email: 'xicoooooodo@hotmail.com',
        password: '123123',
      });

    expect(res.body).toEqual({ message: 'sucess' });
    expect(res.status).toEqual(200);
  });

  it('should registry customer get token and send taxpayer registry', async () => {
    let res: any;
    res = await request(server)
      .post('/api/v1/user')
      .send({
        email: 'xicoooooodo@hotmail.com',
        password: '123123',
      });

    res = await request(server)
      .post('/api/v1/login')
      .send({
        email: 'xicoooooodo@hotmail.com',
        password: '123123',
      });
    const token = res.body.token;

    res = await request(server)
      .put('/api/v1/taxpayer-registry')
      .send({
        cpf: '56282681006',
        countryCode: 'BR',
      })
      .set('Authorization', token);

    expect(res.status).toEqual(200);
  });

  it('should registry customer send name if invalid token', async () => {
    let res: any;
    res = await request(server)
      .post('/api/v1/user')
      .send({
        email: 'xicoooooodo@hotmail.com',
        password: '123123',
      });

    res = await request(server)
      .post('/api/v1/login')
      .send({
        email: 'xicoooooodo@hotmail.com',
        password: '123123',
      });

    res = await request(server)
      .put('/api/v1/full-name')
      .send({
        lastName: 'Matheus',
        firstName: 'Francisco',
      })
      .set('Authorization', 'fake-toke');

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ error: 'Unauthorazing' });
  });
});
