import TaxpayerRegistry from './taxpayer-registry';
import { countries } from './country';

import { ServiceError } from '../../service-error';

describe('TaxpayerRegistry', () => {
  it('should hold Taxpayer Registry value', () => {
    const taxpayerRegistry = new TaxpayerRegistry('56282681006', countries.BR);
    expect(taxpayerRegistry.value).toEqual('56282681006');
  });
  it('should throw for invalid CPF', () => {
    expect(() => new TaxpayerRegistry('zueira', countries.BR)).toThrow(
      new ServiceError('invalid taxpayerRegistry'),
    );
  });
});
