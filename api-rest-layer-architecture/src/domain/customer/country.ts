import { ServiceError } from '../../service-error';
export type CountryCode = 'US' | 'BR';

export interface Country {
  countryCode: CountryCode;
  validateTaxpayerRegistry: (value: string) => boolean;
}

//copy from stackoverflow heheh
const Brazil: Country = {
  countryCode: 'BR',
  validateTaxpayerRegistry: (taxpayerRegistry: string) => {
    function cpf(cpf: any) {
      cpf = cpf.replace(/\D/g, '');
      if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
      var result = true;
      [9, 10].forEach(function(j) {
        var soma = 0,
          r;
        cpf
          .split(/(?=)/)
          .splice(0, j)
          .forEach(function(e: any, i: any) {
            soma += parseInt(e) * (j + 2 - (i + 1));
          });
        r = soma % 11;
        r = r < 2 ? 0 : 11 - r;
        if (r != cpf.substring(j, j + 1)) result = false;
      });
      return result;
    }
    if (!cpf(taxpayerRegistry)) throw new ServiceError('invalid taxpayerRegistry');
    return true;
  },
};

//copy from stackoverflow heheh
const UnitedStates: Country = {
  countryCode: 'US',
  validateTaxpayerRegistry: (SSN: string) => {
    function validateSSN(elementValue: string) {
      var ssnPattern = /^[0-9]{3}\-?[0-9]{2}\-?[0-9]{4}$/;
      return ssnPattern.test(elementValue);
    }
    if (!validateSSN(SSN)) throw new ServiceError('invalid taxpayerRegistry');
    return true;
  },
};

export const countries = {
  BR: Brazil,
  US: UnitedStates,
};

export class CountryFactory {
  buildCountry(countryCode: CountryCode) {
    const country = countries[countryCode];
    if (!country) {
      throw new ServiceError();
    }
    return country;
  }
}
