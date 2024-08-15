import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
    amount: number;
    transactionId: string;
    status: string;
    createdAt: Date;
}

const PaymentSchema: Schema = new Schema({
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPayment>('Payment', PaymentSchema);
