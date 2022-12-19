import { container } from 'tsyringe';
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
