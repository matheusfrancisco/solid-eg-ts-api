import { ServiceError } from '../../service-error';

export default class Email {
  constructor(readonly value: string) {
    this.validateEmail(value);
  }

  private validateEmail(value: string) {
    //copy from stackoverflow :-)
    const emailRegExpValidation = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
    const isValid = emailRegExpValidation.test(value);

    if (!isValid) {
      throw new ServiceError('invalid email');
    }
    return value;
  }
}
