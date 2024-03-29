import { injectable, inject } from 'tsyringe';
import { ISpecificationsRepotory } from '../../repositories';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepotory,
  ) { }

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists');
    }

    await this.specificationRepository.create({ name, description });
  }
}
export { CreateSpecificationUseCase };
