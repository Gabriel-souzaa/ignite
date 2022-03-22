import { Router } from 'express';
import { SpecificationsRepotory } from '../modules/cars/repositories/SpecificationsRepotory';
import { CreateSpecificationService } from '../modules/cars/services/CreateSpecificationService';

const specificationsRoutes = Router();
const specificationRepository = new SpecificationsRepotory();

specificationsRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateSpecificationService(
    specificationRepository,
  );

  createCategoryService.execute({ name, description });

  return response.status(201).send();
});

specificationsRoutes.get('/', (request, response) => {
  const all = specificationRepository.list();
  return response.json(all);
});

export { specificationsRoutes };
