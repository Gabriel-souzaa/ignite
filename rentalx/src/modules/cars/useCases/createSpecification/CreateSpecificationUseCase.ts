import { SpecificationsRepotory } from '../../repositories/implementations/SpecificationsRepotory';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationRepository: SpecificationsRepotory) { }

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists');
    }

    await this.specificationRepository.create({ name, description });
  }
}
export { CreateSpecificationUseCase };
