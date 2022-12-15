import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { ListSpecificationController } from './ListSpecificationController';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

export default (): ListSpecificationController => {
  const specificationRepository = new SpecificationsRepository();
  const listSpecificationUseCase = new ListSpecificationsUseCase(
    specificationRepository,
  );
  const listSpecificationController = new ListSpecificationController(
    listSpecificationUseCase,
  );

  return listSpecificationController;
};
