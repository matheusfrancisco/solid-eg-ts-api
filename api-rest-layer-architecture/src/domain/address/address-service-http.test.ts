import axios from 'axios';
import { callViaCep, validateAddress } from './address-service';

describe('Customer', () => {
  it('validate search cep', async () => {
    const data = {
      cep: '15710-000',
      address: '',
      city: 'São Francisco',
      number: '',
      state: 'SP',
    };
    const callViaCep = jest.fn();
    callViaCep.mockResolvedValue(data);

    const response = await callViaCep('15710000');
    expect(response.address).toEqual('');
    expect(response.city).toEqual('São Francisco');
    expect(response.state).toEqual('SP');
  });

  it('validate search cep small city', async () => {
    const data = {
      cep: '15710-000',
      address: '',
      city: 'São Francisco',
      number: '',
      state: 'SP',
    };
    const callViaCep = jest.fn();
    callViaCep.mockResolvedValue(data);

    const response = await validateAddress({
      cep: '15710000',
      address: 'Amora',
      city: 'São Francisco',
      number: 930,
      state: 'SP',
    });

    expect(response.address).toEqual('Amora');
    expect(response.city).toEqual('São Francisco');
    expect(response.state).toEqual('SP');
    expect(response.number).toEqual(930);
  });
});
