import { Request, Response } from 'express';
import { ListSpecificationsUseCase } from './ListSpecificationsUseCase';

class ListSpecificationController {
  constructor(private listSpecificationUseCase: ListSpecificationsUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const specifications = await this.listSpecificationUseCase.execute();
    return response.json(specifications);
  }
}
export { ListSpecificationController };
