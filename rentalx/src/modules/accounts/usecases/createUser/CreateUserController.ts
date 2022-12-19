import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCse } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, driverLicense, email, password, username } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCse);

    await createUserUseCase.execute({
      name,
      driverLicense,
      email,
      password,
      username,
    });

    return response.status(201).send();
  }
}
export { CreateUserController };
