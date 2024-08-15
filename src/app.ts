import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './app/config/db';
import { paymentRoutes } from './app/modules/payment/payment.route';

const app = express();

app.use(bodyParser.json());

app.use('/api/payment', paymentRoutes);

connectDB();

export default app;
