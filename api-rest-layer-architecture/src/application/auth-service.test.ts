import sinon from 'sinon';
import CustomerService from './auth-service';
import bcrypt from 'bcrypt';

describe('CustomerService', () => {
  it('should find user check if password match and createToken', async () => {
    const save = sinon.spy();
    const pass = await bcrypt.hash('123123', 8);
    const findByEmail = sinon.fake.returns({
      id: 1,
      email: 'matheusfrancisco@hotmail.com',
      password: pass,
    });
    const update = sinon.spy();
    const updateFullName = sinon.spy();
    const fakeToken = 'HJKhDrT_-dKpkIPq-M5E62bUjAUU7GS0J6uec5XLLg';
    const createToken = sinon.fake.returns(fakeToken);

    const customerService = new CustomerService({ save, findByEmail, updateFullName, update });
    customerService.createToken = createToken;
    const token = await customerService.singIn('matheusfrancisco@hotmail.com', '123123');
    expect(findByEmail.called).toBeTruthy();
    expect(token).toEqual(fakeToken);
  });

  it('should return null when password doesnt  match', async () => {
    const save = sinon.spy();
    const pass = await bcrypt.hash('123', 8);

    const findByEmail = sinon.fake.returns({
      id: 1,
      email: 'matheusfrancisco@hotmail.com',
      password: pass,
    });
    const update = sinon.spy();
    const updateFullName = sinon.spy();
    const fakeToken = 'HJKhDrT_-dKpkIPq-M5E62bUjAUU7GS0J6uec5XLLg';
    const createToken = sinon.fake.returns(fakeToken);

    const customerService = new CustomerService({ save, findByEmail, updateFullName, update });
    customerService.createToken = createToken;
    const token = await customerService.singIn('matheusfrancisco@hotmail.com', '123123');
    expect(findByEmail.called).toBeTruthy();
    expect(token).toEqual(null);
  });

  xit('should return verify and return email and id if token valid and url order is correct', async () => {
    const save = sinon.spy();
    const pass = await bcrypt.hash('123', 8);

    const findByEmail = sinon.fake.returns({
      id: 1,
      email: 'matheusfrancisco@hotmail.com',
      password: pass,
      nextEndpoint: '/api/v1/taxpayer-registry',
    });
    const update = sinon.spy();
    const updateFullName = sinon.spy();

    const customerService = new CustomerService({ save, findByEmail, updateFullName, update });
    const payload = await customerService.verify(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYXRoZXVzZnJhbmNpc2NvQGhvdG1haWwuY29tIiwiaWF0IjoxNTk4NzM3MjMzLCJleHAiOjE1OTg3NDQ0MzN9.pQSVenUvsLomAbeHinmmHeAhytbvkEEpAK5o-MJKx_4',
      '/api/v1/taxpayer-registry',
    );
    expect(findByEmail.called).toBeTruthy();
    expect(payload).toEqual({ email: 'matheusfrancisco@hotmail.com', id: 1 });
  });
});
