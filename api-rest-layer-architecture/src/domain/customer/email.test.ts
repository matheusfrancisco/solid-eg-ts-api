import Email from './email';
import { ServiceError } from '../../service-error';

describe('Customer', () => {
  const validEmail = 'matheusmachadoufsc@gmail.com';

  const email = new Email(validEmail);

  it('has a email', () => {
    expect(email.value).toEqual(validEmail);
  });

  it('should throw for invalid email', () => {
    expect(() => new Email('zueira')).toThrow(new ServiceError('invalid email'));
  });
});
