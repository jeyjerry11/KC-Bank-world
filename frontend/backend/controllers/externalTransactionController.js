const axios = require('axios');
require('dotenv').config();

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const FLW_BASE_URL = process.env.FLW_BASE_URL;

// 🌍 SEND TO OTHER BANK
exports.sendMoney = async (req, res) => {
  const { amount, account_bank, account_number, narration, currency, tx_ref } = req.body;

  try {
    const response = await axios.post(`${FLW_BASE_URL}/v3/transfers`, {
      account_bank,
      account_number,
      amount,
      narration,
      currency,
      reference: tx_ref,
      callback_url: "https://your-app.com/callback",
      debit_currency: "NGN"
    }, {
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Send Money Error:", error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};

// ✅ VERIFY TRANSACTION STATUS
exports.verifyTransaction = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${FLW_BASE_URL}/v3/transactions/${id}/verify`, {
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`
      }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Verify Transaction Error:", error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};

// 🌍 ALL TRANSACTIONS FROM FLW (Optional)
exports.getTransactions = async (req, res) => {
  try {
    const response = await axios.get(`${FLW_BASE_URL}/v3/transactions`, {
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`
      }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Fetch Transactions Error:", error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};

// 🌍 GET BANKS LIST
exports.getBanksList = async (req, res) => {
  try {
    const response = await axios.get(`${FLW_BASE_URL}/v3/banks`, {
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`
      }
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Fetch Banks List Error:", error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
};

