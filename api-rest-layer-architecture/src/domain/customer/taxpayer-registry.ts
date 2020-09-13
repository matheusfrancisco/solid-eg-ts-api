import { Country } from './country';

export default class TaxpayerRegistry {
  constructor(readonly value: string, readonly country: Country) {
    country.validateTaxpayerRegistry(value);
  }
}
