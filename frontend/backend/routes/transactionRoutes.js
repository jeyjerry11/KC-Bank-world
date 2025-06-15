const express = require('express');
const router = express.Router();
const { sendMoney, getTransactions } = require('../controllers/transactionController');

router.post('/send', sendMoney);
router.get('/history/:userId', getTransactions);

module.exports = router;
// This code sets up the transaction routes for sending money and retrieving transaction history. It imports the necessary modules and controller functions, defines the routes, and exports the router for use in the main application file. The `sendMoney` function handles sending money, while `getTransactions` retrieves the transaction history for a specific user.
// This modular approach allows for better organization and maintainability of the code, making it easier to manage different aspects of the banking application.