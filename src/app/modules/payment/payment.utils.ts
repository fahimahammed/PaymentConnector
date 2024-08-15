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
            cus_name: "Fahim Ahammed",
            cus_email: "fahimfiroz.ph@gmail.com",
            cus_phone: "01870762472",
            cus_add1: "53, Gausul Azam Road, Sector-14, Dhaka, Bangladesh",
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_country: "Bangladesh",
            currency: "BDT",
            amount,
            tran_id: transactionId,
            success_url: `http://localhost:3000/api/payment/verify?transactionId=${transactionId}`,
            fail_url: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf6Z7CgLJ3JfLy4IREsARVyxcBnQQnHN40jw&s`,
            cancel_url: `https://static.vecteezy.com/system/resources/previews/019/797/644/non_2x/failed-rubber-stamp-with-grunge-style-on-white-background-vector.jpg`,
            desc: "Course Fee",
            type: "json"
        });

        return response.data;
    } catch (error) {
        console.error('AmarPay initiation error:', error);
        throw new Error('Payment initiation failed');
    }
};


const AMARPAY_VERIFY_URL = process.env.AMARPAY_VERIFY_URL!;
export const verifyPaymentWithAmarPay = async (transactionId: string) => {
    try {
        const response = await axios.get(`${AMARPAY_VERIFY_URL}`, {
            params: {
                store_id: STORE_ID,
                signature_key: SIGNATURE_KEY,
                request_id: transactionId,
                type: 'json',
            },
        });
        console.log(response, "verify response")
        return response.data;
    } catch (error) {
        console.error('AmarPay verification error:', error);
        throw new Error('Payment verification failed');
    }
};
