import { injectable, inject } from 'tsyringe';
import { ICreateUserDTO } from '../../dtos';
import { IUsersRepository } from '../../repositories';

@injectable()
class CreateUserUseCse {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  async execute({
    name,
    driverLicense,
    email,
    password,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error('User exists');
    }

    await this.usersRepository.create({
      name,
      driverLicense,
      email,
      password,
    });
  }
}

export { CreateUserUseCse };
