import Email from './email';
import TaxpayerRegistry from './taxpayer-registry';
import { AddressInterface } from '../address/address';
import AddressService, { validateAddress } from '../address/address-service';

export default class Customer {
  private _firstName?: string;
  private _lastName?: string;
  public readonly email: Email;
  public readonly password: string;
  private _taxpayerRegistry?: TaxpayerRegistry;
  private _address?: AddressService;
  private _countryCode?: string;

  constructor({
    email,
    password,
    lastName,
    firstName,
    taxpayerRegistry,
    address,
    countryCode,
  }: any) {
    this.email = new Email(email);
    this.password = password;
    this._lastName = lastName;
    this._firstName = firstName;
    this._taxpayerRegistry = taxpayerRegistry;
    this._address = address;
    this._countryCode = countryCode;
  }

  get firstName(): Partial<string | undefined> {
    return this._firstName;
  }

  set firstName(firstName: Partial<string | undefined>) {
    if (firstName) {
      this._firstName = firstName;
    }
  }

  get lastName(): Partial<string | undefined> {
    return this._lastName;
  }

  set lastName(lastName: Partial<string | undefined>) {
    if (lastName) {
      this._lastName = lastName;
    }
  }

  public updateTaxpayerRegistry(taxpayerRegistry: TaxpayerRegistry): void {
    this._taxpayerRegistry = taxpayerRegistry;
  }

  get taxpayerRegistry(): string | undefined {
    return this._taxpayerRegistry?.value;
  }

  public async updateAddres({ address, cep, city, number, state }: AddressInterface) {
    const data = await validateAddress({
      address,
      cep,
      city,
      number,
      state,
    });
    this._address = new AddressService({ ...data });
  }

  public toRepository(): Record<string, string | undefined | number> {
    return {
      firstName: this._firstName,
      lastName: this._lastName,
      email: this.email.value,
      taxpayerRegistry: this._taxpayerRegistry?.value,
      password: this.password,
      address: this._address?.address,
      cep: this._address?.cep,
      state: this._address?.state,
      number: this._address?.number,
      city: this._address?.city,
      countryCode: this._countryCode,
    };
  }
}
