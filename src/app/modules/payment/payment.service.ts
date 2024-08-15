import Payment, { IPayment } from "./payment.model";
import { initiatePayment, verifyPaymentWithAmarPay } from "./payment.utils";


export const createPayment = async (amount: number): Promise<IPayment> => {
    const transactionId = `TXN-${Date.now()}`;

    const paymentResponse = await initiatePayment(amount, transactionId);
    const payment = new Payment({
        amount,
        transactionId,
        status: 'Pending',
    });

    await payment.save();
    console.log(payment)
    return paymentResponse;
};


export const verifyAndUpdatePaymentStatus = async (transactionId: string): Promise<IPayment | null> => {
    // Step 1: Verify payment with AmarPay
    const verificationResponse = await verifyPaymentWithAmarPay(transactionId);
    console.log("Verify Response", verificationResponse);

    // Step 2: Find the payment in the database
    const payment = await Payment.findOne({ transactionId });

    if (!payment) {
        throw new Error('Payment not found');
    }

    // Step 3: Check the verification response and update the payment status
    if (verificationResponse && verificationResponse.pay_status === 'Successful') {
        payment.status = 'Completed';
    } else {
        payment.status = 'Failed';
    }

    // Step 4: Save the updated payment status in the database
    await payment.save();

    return payment;
};

