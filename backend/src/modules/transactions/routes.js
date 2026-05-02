import { Router } from 'express';
import { checkout, getTransactions, getTransaction } from './controller.js';
import { validatePayload } from '../../shared/middlewares/validate_middleware.js';
import { checkoutSchema } from './schema.js';
import authMiddleware from '../../shared/middlewares/auth_middleware.js';

const routes = Router();

routes.post('/transactions', authMiddleware, validatePayload(checkoutSchema), checkout);
routes.get('/transactions', authMiddleware, getTransactions);
routes.get('/transactions/:id', authMiddleware, getTransaction);

export default routes;