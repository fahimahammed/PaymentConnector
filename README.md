# PaymentConnector

## **AmarPay Payment Integration with Node.js**

This guide outlines the steps for integrating AmarPay into your Node.js application.

### Overview

AmarPay provides REST APIs for payment processing. Use the Sandbox environment for testing and the Live environment for production.

- **Sandbox API Endpoint**: `https://sandbox.aamarpay.com/jsonpost.php`
- **Live API Endpoint**: Provided by AmarPay upon going live.

### Testing Environment (Sandbox Environment)

For testing, use:
- **Store ID**: `aamarpaytest`
- **Signature Key**: `dbb74894e82415a2f7ff0ec3a97e4183`

### Production Environment

For production, use the Store ID and Signature Key provided by AmarPay.

### Required Parameters

The following parameters are required for the payment request:

- `store_id`: Store ID (e.g., aamarpaytest)
- `signature_key`: Signature key (e.g., dbb74894e82415a2f7ff0ec3a97e4183)
- `cus_name`: Client's name
- `cus_email`: Client's email address
- `cus_phone`: Client's phone number
- `cus_add1`: Client's primary address
- `cus_add2`: Client's secondary address (optional)
- `cus_city`: Client's city name
- `cus_country`: Client's country name
- `amount`: Amount to be paid
- `tran_id`: Unique transaction ID
- `currency`: Currency type (e.g., BDT / USD)
- `success_url`: Success page URL
- `fail_url`: Fail page URL
- `cancel_url`: Cancel page URL
- `desc`: Payment description
- `opt_a`, `opt_b`, `opt_c`: Optional parameters
- `type`: Should be `json` to pass JSON data

### Example Request

**Request Body**

```javascript
const request = require('request');

const options = {
  url: 'https://sandbox.aamarpay.com/jsonpost.php',
  method: 'POST',
  json: true,
  body: {
    store_id: "aamarpaytest",
    signature_key: "dbb74894e82415a2f7ff0ec3a97e4183",
    cus_name: "Fahim Ahammed Firoz",
    cus_email: "fahim@ph.com",
    cus_phone: "0199999999",
    cus_add1: "Dhaka, Bangladesh",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    amount: "500.00",
    tran_id: "TNX-453243",
    currency: "BDT",
    success_url: "https://example.com/success.php",
    fail_url: "https://example.com/fail.php",
    cancel_url: "https://example.com/cancel.php",
    desc: "Course Fee",
    type: "json"
  }
};

request(options, function (error, response, body) {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Response:', body);
  }
});
```

**Response Body**

```json
{
  "result": "true",
  "payment_url": "https://sandbox.aamarpay.com/paynow.php?track=AAM1604476085103491"
}
```

---

### **AmarPay Transaction Verification Integration with Node.js**

This guide explains how to verify a payment transaction using AmarPay’s API in a Node.js application.

### Base URL

- **Sandbox API Endpoint**: `https://sandbox.aamarpay.com/api/v1/trxcheck/request.php`

### Credentials

- **Store ID**: `aamarpaytest`
- **Signature Key**: `dbb74894e82415a2f7ff0ec3a97e4183`

### API Operation

The **Search Transaction** API provides detailed information about a specific transaction using the merchant transaction ID.

### Request Parameters

The following parameters are required for the transaction verification request:

| **Parameter**    | **Requirement** | **Type** | **Description**                                                                                  | **Example**                  |
|------------------|------------------|----------|--------------------------------------------------------------------------------------------------|------------------------------|
| `request_id`     | Mandatory        | String   | Unique identifier for merchant transactions, also known as the merchant transaction ID.         | `WEP-SMZZ4ZM8EC`             |
| `store_id`       | Mandatory        | String   | Merchant ID assigned by AmarPay, serving as your unique identifier.                             | `aamarpaytest`               |
| `signature_key`  | Mandatory        | String   | Signature Key issued by AmarPay for unique authentication.                                       | `dbb74894e82415a2f7ff0ec3a97e4183` |
| `type`           | Mandatory        | String   | The value should always be `"json"` to indicate JSON data format.                                | `json`                        |

### Example Request

Below is an example of how to make a request to the AmarPay API using Node.js with the `axios` library:

```javascript
const axios = require('axios');

// Base URL for AmarPay API
const AMARPAY_VERIFY_URL = 'https://sandbox.aamarpay.com/api/v1/trxcheck/request.php';

// Credentials
const STORE_ID = 'aamarpaytest';
const SIGNATURE_KEY = 'dbb74894e82415a2f7ff0ec3a97e4183';

// Function to verify transaction
async function verifyTransaction(transactionId) {
    try {
        const response = await axios.get(AMARPAY_VERIFY_URL, {
            params: {
                store_id: STORE_ID,
                signature_key: SIGNATURE_KEY,
                request_id: transactionId,
                type: 'json',
            },
        });
        console.log('Verify response:', response.data);
        return response.data;
    } catch (error) {
        console.error('AmarPay verification error:', error);
        throw new Error('Payment verification failed');
    }
}

// Example usage
verifyTransaction('TNX-453243');
```

### Sample Response

Here’s an example of the response you might receive from the AmarPay API:

```json
{
  "pg_txnid": "AAMXXXXXXXXXXXX",
  "mer_txnid": "XXXXXXXXXX",
  "risk_title": "Not-Available",
  "risk_level": null,
  "cus_name": "Fahim Ahammed Firoz",
  "cus_email": "fahim@ph.com",
  "cus_phone": "01999999999",
  "cus_add1": "Dhaka",
  "cus_add2": "Dhaka",
  "cus_city": "Dhaka",
  "cus_state": "Dhaka",
  "cus_postcode": "1206",
  "cus_country": "Bangladesh",
  "cus_fax": "",
  "ship_name": null,
  "ship_add1": null,
  "ship_add2": null,
  "ship_city": null,
  "ship_state": null,
  "ship_postcode": null,
  "ship_country": null,
  "desc": null,
  "merchant_id": "XXXXXXX",
  "store_id": "XXXXXXX",
  "amount": "500.00",
  "amount_bdt": "500.00",
  "pay_status": "Successful",
  "status_code": "2",
  "status_title": "Successful Transaction",
  "cardnumber": "XXXXXXXXXXXXXXX",
  "approval_code": "XXXXXXXXXXX",
  "payment_processor": "XXXXXXXXXX",
  "bank_trxid": "XXXXXXXXXXXXX",
  "payment_type": "XXXXXXXXX",
  "error_code": "0000",
  "error_title": "Not-Available",
  "bin_country": "Not-Available",
  "bin_issuer": "Not-Available",
  "bin_cardtype": "Not-Available",
  "bin_cardcategory": "Not-Available",
  "date": "2018-03-17 15:20:55",
  "date_processed": "2018-03-17 15:55:35",
  "amount_currency": "10.00",
  "rec_amount": "9.65",
  "processing_ratio": "3.50",
  "processing_charge": "0.35",
  "ip": "XXXXXXXXXXX",
  "currency": "BDT",
  "currency_merchant": "BDT",
  "convertion_rate": "Not-Available",
  "opt_a": "Not-Available",
  "opt_b": "Not-Available",
  "opt_c": "Not-Available",
  "opt_d": "Not-Available",
  "verify_status": "PENDING",
  "call_type": "Post-Method",
  "email_send": "1",
  "doc_recived": "NO",
  "checkout_status": "Not-Paid-Yet"
}
```

This guide should help you integrate and verify transactions with AmarPay using Node.js. Adjust the code and parameters as needed for your specific implementation.

In case of a failed transaction, the same data will be sent to your `fail_url`. Note that the `cancel_url` will not receive any data; it should be a link to your product or home page.

### Conclusion

Ensure you replace test credentials with production credentials when moving to live transactions. For more details, refer to the [AmarPay API Documentation](https://aamarpay.readme.io/reference/overview).
