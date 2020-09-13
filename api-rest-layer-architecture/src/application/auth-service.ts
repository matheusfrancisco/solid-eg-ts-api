import { CustomerRepository } from '../domain/customer/customer-repository';
import * as jwt from 'jsonwebtoken';
import { ServiceError } from '../service-error';
import bcrypt from 'bcrypt';

export interface Token {
  token: string;
}

export default class AuthService {
  constructor(private customerRepository: CustomerRepository) {}

  async singIn(email: string, password: string) {
    try {
      const user = await this.customerRepository.findByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = this.createToken(user.id, user.email);
        return token;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  public createToken(id: number, email: string) {
    const token = jwt.sign(
      {
        id,
        email,
      },
      'SECRET',
      {
        expiresIn: '2h',
      },
    );

    return token;
  }

  public async verify(
    token: string,
    url: string,
  ): Promise<Record<string, string> | null | ServiceError> {
    try {
      const userPayload = (await jwt.verify(token, 'SECRET')) as any;
      const user = await this.customerRepository.findByEmail(userPayload.email);
      if (user) {
        return {
          id: userPayload.id,
          email: userPayload.email,
        };
      }
      return null;
    } catch (error) {
      throw new ServiceError('Unauthorazing');
    }
  }
}
