import { countries, CountryFactory, CountryCode } from './country';
import { ServiceError } from '../../service-error';

describe('Country', () => {
  describe('Brazil', () => {
    it('should validate Taxpayer Registry value', () => {
      expect(countries.BR.validateTaxpayerRegistry('56282681006')).toBeTruthy();
    });

    it('should throw for invalid CPF', () => {
      expect(() => countries.BR.validateTaxpayerRegistry('zueira')).toThrow(
        new ServiceError('invalid taxpayerRegistry'),
      );
    });
  });

  describe('United States', () => {
    it('should validate Taxpayer Registry value', () => {
      expect(countries.US.validateTaxpayerRegistry('427665509')).toBeTruthy();
    });

    it('should throw for invalid CPF', () => {
      expect(() => countries.US.validateTaxpayerRegistry('zueira')).toThrow(
        new ServiceError('invalid taxpayerRegistry'),
      );
    });
  });
});

describe('County Factory', () => {
  it('should throw for unknown country', () => {
    expect(() => new CountryFactory().buildCountry('UNKNOWN_COUNTRY' as CountryCode)).toThrowError(
      new ServiceError(''),
    );
  });
});
