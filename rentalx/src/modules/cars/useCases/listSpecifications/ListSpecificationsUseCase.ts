import { Specification } from '../../entities/Specification';
import { SpecificationsRepotory } from '../../repositories/implementations/SpecificationsRepotory';

class ListSpecificationsUseCase {
  constructor(private listSpecificationRepository: SpecificationsRepotory) { }

  execute(): Specification[] {
    const specifications = this.listSpecificationRepository.list();
    return specifications;
  }
}
export { ListSpecificationsUseCase };
