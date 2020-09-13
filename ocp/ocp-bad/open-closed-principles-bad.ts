
export default class TaxpayerRegistry {
  constructor(readonly value: string, readonly country: string) {
    if(this.country === 'BR') {
      this.validaBrazil(value);
    } else if ( this.country === 'Another country') {
      this.validaAnotherCountry(value)
    }
  }

  validaBrazil(value: string) {
    //...
  }

  validaAnotherCountry (value: string) {
    //...
  }
}