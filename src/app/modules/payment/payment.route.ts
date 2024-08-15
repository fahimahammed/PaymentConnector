import { Router } from 'express';
import { initiatePaymentHandler, manualPaymentVerificationHandler } from './payment.controller';

const router = Router();

router.post('/verify', manualPaymentVerificationHandler);

router.post('/initiate', initiatePaymentHandler);

export const paymentRoutes = router;
