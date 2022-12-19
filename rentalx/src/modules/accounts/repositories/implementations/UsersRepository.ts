import { Repository } from 'typeorm';
import { myDataSource } from '../../../../database/data-source';
import { ICreateUserDTO } from '../../dtos';
import { User } from '../../entities';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = myDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    driverLicense,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license: driverLicense,
      password,
      isAdmin: false,
    });

    await this.repository.save(user);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export { UsersRepository };
