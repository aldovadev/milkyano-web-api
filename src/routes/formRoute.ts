import { Router } from 'express';
import { apiKeyMiddleware } from '../middlewares/authMiddleware';
import { forwardFormClient, forwardFormAds } from '../controllers/formController';

const router = Router();

router.post('/form/client', apiKeyMiddleware, forwardFormClient);
router.post('/form/ads', apiKeyMiddleware, forwardFormAds);


export default router;