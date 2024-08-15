import { Request, Response } from 'express';
import { createPayment, verifyAndUpdatePaymentStatus } from './payment.service';

export const initiatePaymentHandler = async (req: Request, res: Response) => {
    const { amount } = req.body;

    try {
        const payment = await createPayment(amount);
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
};

export const manualPaymentVerificationHandler = async (req: Request, res: Response) => {
    const { transactionId } = req.query;

    try {
        const payment = await verifyAndUpdatePaymentStatus(transactionId as string);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(200).json({ message: 'Payment status updated', payment });
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
};
