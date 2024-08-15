import { Router } from 'express';
import { initiatePaymentHandler } from './payment.controller';

const router = Router();

router.post('/initiate', initiatePaymentHandler);

export const paymentRoutes = router;
