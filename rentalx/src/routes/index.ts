import { Router } from 'express';
import { authenticateRoutes } from './authenticarte.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', ensureAuthenticated, specificationsRoutes);
router.use('/users', usersRoutes);
router.use(authenticateRoutes);

export { router };
