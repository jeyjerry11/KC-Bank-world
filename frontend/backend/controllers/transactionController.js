const User = require('../models/User');
const Transaction = require('../models/Transaction');

// 🤑 SEND MONEY FUNCTION
exports.sendMoney = async (req, res) => {
  try {
    const { senderId, receiverId, amount, description } = req.body;

    // Validate input
    if (!senderId || !receiverId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find sender and receiver
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'User(s) not found' });
    }

    // Check sender balance
    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    // Transfer money
    sender.balance -= amount;
    receiver.balance += amount;

    // Save users
    await sender.save();
    await receiver.save();

    // Log transaction
    const transaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      description: description || 'Transfer',
      date: new Date(),
    });

    await transaction.save();

    res.status(200).json({ message: 'Transaction successful', transaction });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// 📜 GET TRANSACTION HISTORY
exports.getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const sent = await Transaction.find({ sender: userId }).populate('receiver', 'fullName');
    const received = await Transaction.find({ receiver: userId }).populate('sender', 'fullName');

    res.status(200).json({ sent, received });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// 💰 GET USER BALANCE
exports.getBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
const axios = require('axios');
require('dotenv').config();

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const FLW_BASE_URL = process.env.FLW_BASE_URL;

// Send money to Nigerian bank
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
      callback_url: "https://your-app.com/callback", // optional
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

// Get transaction status
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

// Fetch transaction history (optional)
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
// Get list of banks