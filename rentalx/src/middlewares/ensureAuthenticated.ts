import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations';
import { AppError } from '../errors/AppError';

// eslint-disable-next-line import/prefer-default-export
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, '69c6e4a394b794ac45a4ca63761bff01');

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(sub);

    if (!user) {
      throw new AppError('User does not exists!', 401);
    }

    request.user = {
      id: user.id
    }

    next();
  } catch (err) {
    throw new AppError('Invalid token!', 401);
  }
}
