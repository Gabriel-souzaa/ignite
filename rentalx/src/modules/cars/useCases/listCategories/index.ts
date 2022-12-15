import { CategoryRepository } from '../../repositories/implementations/CategoryRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

const categoriesRepository = new CategoryRepository();
const listCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);
const listCategoryController = new ListCategoriesController(
  listCategoryUseCase,
);

export { listCategoryController };
