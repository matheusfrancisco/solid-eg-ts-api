import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";

//repositorio para tabela de usuario, pode ser um banco..
//pode ser uma outra api
//pode ser postgress
//pode ser mysql
//logica fica desacoplada da camada de infra

export class PostgresUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}