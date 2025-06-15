const express = require('express');
const router = express.Router();
const {
  sendMoney,
  verifyTransaction,
  getTransactions
} = require('../controllers/externalTransactionController');

// KC Bank ↔ Other Banks
router.post('/send', sendMoney); // External send
router.get('/verify/:id', verifyTransaction);
router.get('/all', getTransactions); // All FLW transactions

module.exports = router;
// This code sets up the routes for handling external transactions, including sending money, verifying transactions, and fetching all transactions from the external service. It imports the necessary modules and the controller functions, then defines the routes and exports the router for use in the main application file.