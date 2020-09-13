import { User } from "../../src/entities/User";

//Interface 
//metodos do repositorio
export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<void>;
}