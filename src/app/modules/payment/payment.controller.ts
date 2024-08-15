import { Request, Response } from 'express';
import { createPayment } from './payment.service';

export const initiatePaymentHandler = async (req: Request, res: Response) => {
    const { amount } = req.body;

    try {
        const payment = await createPayment(amount);
        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: error?.message });
    }
};
