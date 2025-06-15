const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const dbPath = path.join(__dirname, '../db/users.json');
const transactionsPath = path.join(__dirname, '../db/transactions.json');
const { registerUser } = require('../controllers/userController');

// 👤 Register
router.post('/register', registerUser);

// 🔐 Login
router.post('/login', async (req, res) => {
  const { email, phoneNumber } = req.body;
  const users = JSON.parse(fs.readFileSync(dbPath));
  const user = users.find(u => u.email === email && u.phoneNumber === phoneNumber);
  if (!user) {
    return res.status(401).json({ message: "Login failed" });
  }
  res.json({ message: "Login successful", user });
});

// 💸 Send Naira (App to App)
router.post('/send', async (req, res) => {
  const { senderPhone, receiverPhone, amount } = req.body;
  let users = JSON.parse(fs.readFileSync(dbPath));
  let transactions = JSON.parse(fs.readFileSync(transactionsPath));

  const sender = users.find(u => u.phoneNumber === senderPhone);
  const receiver = users.find(u => u.phoneNumber === receiverPhone);

  if (!sender || !receiver) return res.status(400).json({ message: "User not found" });
  if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ message: "Invalid amount" });
  if (sender.balance < amount) return res.status(400).json({ message: "Insufficient funds" });

  sender.balance -= amount;
  receiver.balance += amount;

  const tx = {
    id: Date.now(),
    from: sender.phoneNumber, // Store phone numbers for easier lookup
    to: receiver.phoneNumber,
    amount,
    time: new Date().toLocaleString(),
  };

  transactions.push(tx);
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  fs.writeFileSync(transactionsPath, JSON.stringify(transactions, null, 2));

  res.json({ message: `₦${amount} sent`, tx });
});

const { sendVerificationEmail } = require('../services/emailService');

router.post('/verify-email', async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000);
  await sendVerificationEmail(email, code);
  res.json({ message: 'Verification email sent', code }); // Store this code in frontend session for confirmation
});

// 📜 Transaction History
router.get('/transactions/:phone', (req, res) => {
  const { phone } = req.params;
  const transactions = JSON.parse(fs.readFileSync(transactionsPath));
  const userTx = transactions.filter(
    t => t.from === phone || t.to === phone
  );
  res.json(userTx);
});

// 🔄 Update User Balance
router.put('/balance/:phone', (req, res) => {
  const { phone } = req.params;
  const { amount } = req.body;
  let users = JSON.parse(fs.readFileSync(dbPath));
  const user = users.find(u => u.phoneNumber === phone);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (typeof amount !== 'number') return res.status(400).json({ message: "Invalid amount" });
  user.balance += amount;
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  res.json({ message: "Balance updated", user });
});

// 🔄 Update User Details
router.put('/details/:phone', (req, res) => {
  const { phone } = req.params;
  const { fullName, email } = req.body;
  let users = JSON.parse(fs.readFileSync(dbPath));
  const user = users.find(u => u.phoneNumber === phone);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.fullName = fullName;
  user.email = email;
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
  res.json({ message: "User details updated", user });
});

module.exports = router;