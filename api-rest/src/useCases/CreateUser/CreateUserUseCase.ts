import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../../src/entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

// Singly Responsability
// Essa classe tem a responsabilidade de criar um usuário apenas.
// Ela não conhece o banco ela só manda salvar no banco.
// Cada UseCase tem apensa um metodo chamado execute, assim não vamos ter logica duplicada

// Injection dependency -> userRepository
// Liskov substituite principles -> contrato ->  dado que o repositorio tenha aquele contrato
// vai salvar no banco 

//Dependency inversion principles...
// dependo da abstraçao interface
export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    //agora precisa inviar email
    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: 'Xicolino crud',
        email: 'crud@solid.com',
      },
      subject: 'Seja bem-vindo à plataforma',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    })
  }
}