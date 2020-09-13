import { AddressInterface } from './address';
import axios from 'axios';

export class AddressServiceError extends Error {
  public title: string;
  constructor(message: string) {
    super(message);
    this.title = 'Validation Error';
  }
}

export const callViaCep = async (cep: string): Promise<AddressInterface> => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return {
      cep: response.data.cep as string,
      address: response.data.logradouro as string,
      city: response.data.localidade as string,
      number: response.data.number as number,
      state: response.data.uf as string,
    };
  } catch (error) {
    throw new AddressServiceError('CEP invalid');
  }
};

export const validateAddress = async ({ cep, address, number, city, state }: AddressInterface) => {
  const data = await callViaCep(cep);
  const addressValidate = data && data.cep === cep && data.state == state && data.city === city;
  const validateSmallCity =
    data && data.address === '' && data.state === state && data.city === city;
  if (addressValidate) {
    return { ...data, number: number };
  } else if (validateSmallCity) {
    return { ...data, address, number };
  } else {
    throw new AddressServiceError('Invalid address');
  }
};

//#Improve domain anemico
export default class AddresService {
  public readonly cep: string | undefined;
  public readonly address: string | undefined;
  public readonly number: number | undefined;
  public readonly city: string | undefined;
  public readonly state: string | undefined;

  constructor({ cep, address, number, city, state }: AddressInterface) {
    this.cep = cep ? this.sanitazeCep(cep) : cep;
    this.address = address;
    this.city = city;
    this.number = number;
    this.state = state;
  }

  private sanitazeCep(cep: string): string {
    return cep.replace('-', '');
  }
}
