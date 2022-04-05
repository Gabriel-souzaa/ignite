import { SpecificationsRepotory } from '../../repositories/implementations/SpecificationsRepotory';
import { ListSpecificationController } from './ListSpecificationController';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

const specificationRepository = SpecificationsRepotory.getInstance();
const listSpecificationUseCase = new ListSpecificationsUseCase(
  specificationRepository,
);
const listSpecificationController = new ListSpecificationController(
  listSpecificationUseCase,
);

export { listSpecificationController };
