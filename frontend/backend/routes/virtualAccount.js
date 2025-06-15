const express = require('express');
const router = express.Router();
const axios = require('axios');
const { initiateFlutterwaveAccount } = require('../services/flutterwaveService');

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

// 🌐 Create virtual account
router.post('/create-virtual-account', async (req, res) => {
  try {
    const { email, bvn } = req.body;
    const result = await initiateFlutterwaveAccount({ email, bvn });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to create virtual account" });
  }
});
const { retryTransfer } = require('../utils/retry');
router.post('/send-bank', async (req, res) => {
  const { account_bank, account_number, amount, narration, currency } = req.body;
  const payload = {
    account_bank,
    account_number,
    amount,
    narration,
    currency,
    reference: "KCBANK_" + Date.now(),
    callback_url: "https://your-callback-url.com",
    debit_currency: "NGN"
  };

  const headers = { Authorization: `Bearer ${process.env.FLW_SECRET_KEY}` };
  const result = await retryTransfer(payload, headers, 3, 5000);
  res.json(result);
});

// 🏦 Send to other bank
router.post('/send-bank', async (req, res) => {
  const { account_bank, account_number, amount, narration, currency } = req.body;

  try {
    const response = await axios.post(
      'https://api.flutterwave.com/v3/transfers',
      {
        account_bank,
        account_number,
        amount,
        narration,
        currency,
        reference: "KCBANK_" + Date.now(),
        callback_url: "https://your-callback-url.com",
        debit_currency: "NGN"
      },
      {
        headers: {
          Authorization: `Bearer ${FLW_SECRET_KEY}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
// This code defines routes for creating virtual accounts and sending money to other banks using the Flutterwave API.
// It uses Express for routing and Axios for making HTTP requests to the Flutterwave API.           