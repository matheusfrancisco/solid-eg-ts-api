import Customer from './customer';

describe('Customer', () => {
  const name = 'Xico';
  const email = 'matheusfrancisco@hotmail.com';
  const password = '123123';
  const customer = new Customer({ name, email, password });

  it('has a taxpayerRegistry', () => {
    expect(customer.email.value).toEqual(email);
  });

  it('has a pass', () => {
    expect(customer.password).toEqual(password);
  });
});
