import Payment, { IPayment } from "./payment.model";
import { initiatePayment } from "./payment.utils";


export const createPayment = async (amount: number): Promise<IPayment> => {
    const transactionId = `TXN-${Date.now()}`;

    const paymentResponse = await initiatePayment(amount, transactionId);
    console.log("payment response: ", paymentResponse)
    const payment = new Payment({
        amount,
        transactionId,
        status: 'Pending',
    });

    await payment.save();

    return payment;
};
