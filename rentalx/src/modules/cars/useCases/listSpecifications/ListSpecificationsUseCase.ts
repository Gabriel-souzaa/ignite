import { injectable, inject } from 'tsyringe';
import { Specification } from '../../entities';
import { ISpecificationsRepotory } from '../../repositories';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private listSpecificationRepository: ISpecificationsRepotory,
  ) { }

  async execute(): Promise<Specification[]> {
    const specifications = await this.listSpecificationRepository.list();
    return specifications;
  }
}
export { ListSpecificationsUseCase };
