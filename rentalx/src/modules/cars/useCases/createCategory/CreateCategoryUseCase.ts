import { injectable, inject } from 'tsyringe';
import { ICategoriesRepository } from '../../repositories';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoryRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new Error('Category exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}
export { CreateCategoryUseCase };
