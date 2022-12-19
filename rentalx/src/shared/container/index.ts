import { container } from 'tsyringe';
import { IUsersRepository } from '../../modules/accounts/repositories';
import { UsersRepository } from '../../modules/accounts/repositories/implementations';
import {
  ICategoriesRepository,
  ISpecificationsRepotory,
} from '../../modules/cars/repositories';
import {
  CategoryRepository,
  SpecificationsRepository,
} from '../../modules/cars/repositories/implementations';

container.registerSingleton<ICategoriesRepository>(
  'CategoryRepository',
  CategoryRepository,
);

container.registerSingleton<ISpecificationsRepotory>(
  'SpecificationsRepository',
  SpecificationsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
