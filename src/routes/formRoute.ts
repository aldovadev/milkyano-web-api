import { Router } from 'express';
import { apiKeyMiddleware } from '../middlewares/authMiddleware';
import { forwardForm } from '../controllers/formController';

const router = Router();

router.post('/form', apiKeyMiddleware, forwardForm);

export default router;