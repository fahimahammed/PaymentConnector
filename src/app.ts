import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './app/config/db';

const app = express();

app.use(bodyParser.json());

// app.use('/api/payment', paymentRoutes);

connectDB();

export default app;
