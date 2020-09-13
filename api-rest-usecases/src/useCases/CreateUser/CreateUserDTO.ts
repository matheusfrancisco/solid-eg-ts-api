export interface ICreateUserRequestDTO {
  name: string;
  email: string;
  password: string;
}
//Data Transfer Object...
//Transferir objetos de uma camada para outra
//Controller (eu estou na camada de mundo externo HTTP(protocolo))