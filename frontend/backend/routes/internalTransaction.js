const { verifyTransaction } = require('../controllers/transactionController');

const express = require('express');
const router = express.Router();
const {
  sendMoney,
  getTransactions,
  getBalance
} = require('../controllers/internalTransactionController');

// KC Bank ↔ KC Bank
router.post('/send', sendMoney);
router.get('/history/:userId', getTransactions);
router.get('/balance/:userId', getBalance);
router.get('/verify/:id', verifyTransaction);
module.exports = router;
// This code sets up the routes for handling internal transactions within KC Bank, including sending money, retrieving transaction history, checking balance, and verifying transactions. It imports the necessary modules and controller functions, defines the routes, and exports the router for use in the main application file.
// The routes are designed to handle requests related to internal transactions, ensuring that users can perform actions like sending money to other users within the same bank, checking their transaction history, and verifying specific transactions.
// The `sendMoney` function handles the logic for sending money between users, while `getTransactions` retrieves the transaction history for a specific user, and `getBalance` checks the user's current balance. The `verifyTransaction` function is used to verify the status of a specific transaction by its ID.        
// This modular approach allows for better organization and maintainability of the code, making it easier to manage different aspects of the banking application.
// The use of Express Router helps in defining routes in a clean and structured manner, allowing for easy expansion and modification of the application's routing logic in the future.
// The code is ready to be integrated into the main application file, where it can be mounted on a specific path (e.g., `/api/internal-transaction`) to handle requests related to internal transactions within KC Bank.
// This setup is essential for building a robust banking application that can handle various transaction types and user interactions efficiently.
// The routes defined here are crucial for the internal transaction functionality of the banking application, allowing users to interact with their accounts and perform necessary financial operations seamlessly.
// The modular structure of the code promotes better organization and maintainability, making it easier to manage different aspects of the banking application.
// The use of Express Router allows for a clean and structured way to define routes, making it easier to expand and modify the application's routing logic in the future.