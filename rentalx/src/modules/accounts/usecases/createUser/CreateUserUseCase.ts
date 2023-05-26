import { injectable, inject } from 'tsyringe';
import { hash } from 'bcrypt';
import { ICreateUserDTO } from '../../dtos';
import { IUsersRepository } from '../../repositories';
import { AppError } from '../../../../errors/AppError';

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
      throw new AppError('User exists');
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      driverLicense,
      email,
      password: passwordHash
    });
  }
}

export { CreateUserUseCse };
