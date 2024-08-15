import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const AMARPAY_URL = process.env.AMARPAY_URL!;
const STORE_ID = process.env.STORE_ID!;
const SIGNATURE_KEY = process.env.SIGNATURE_KEY!;

export const initiatePayment = async (amount: number, transactionId: string) => {
    try {
        const response = await axios.post(`${AMARPAY_URL}/jsonpost.php`, {
            store_id: STORE_ID,
            signature_key: SIGNATURE_KEY,
            cus_name: "Imtiaz Akil",
            cus_email: "imtiaz.akil@softbd.com",
            cus_phone: "01870762472",
            cus_add1: "53, Gausul Azam Road, Sector-14, Dhaka, Bangladesh",
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_country: "Bangladesh",
            currency: "BDT",
            amount,
            tran_id: transactionId,
            success_url: `${process.env.BASE_URL}/api/payment/success`,
            fail_url: `${process.env.BASE_URL}/api/payment/fail`,
            cancel_url: `${process.env.BASE_URL}/api/payment/cancel`,
            desc: "Lend Money",
            type: "json"
        });

        return response.data;
    } catch (error) {
        console.error('AmarPay initiation error:', error);
        throw new Error('Payment initiation failed');
    }
};
