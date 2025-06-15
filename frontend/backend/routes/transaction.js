const express = require('express');
const router = express.Router();
const {
  sendMoney,
  getTransactions,
  verifyTransaction,
  getBalance
} = require('../controllers/transactionController');

// 👉 Route to send money
router.post('/send', sendMoney);

// 👉 Route to fetch a user’s transactions
router.get('/history/:userId', getTransactions);

// 👉 Optional: Route to check balance
router.get('/balance/:userId', getBalance);
router.get('/verify/:id', verifyTransaction); // GET /api/tx/verify/123456

router.get('/all', getTransactions); // GET /api/tx/all
module.exports = router;

// This code sets up the routes for handling transactions within the banking application. It includes routes for sending money, fetching a user's transaction history, checking balance, and verifying transactions. The router is exported for use in the main application file, allowing for organized and modular handling of transaction-related requests.
// The `sendMoney` function handles the logic for sending money between users, while `getTransactions` retrieves the transaction history for a specific user. The `getBalance` function checks the user's current balance, and the `verifyTransaction` function is used to verify the status of a specific transaction by its ID. The `/all` route fetches all transactions, providing a comprehensive view of all transaction activities within the application.
// This modular approach allows for better organization and maintainability of the code, making it easier to manage different aspects of the banking application.
// The use of Express Router helps in defining routes in a clean and structured manner, allowing for easy expansion and modification of the application's routing logic in the future.
// The code is ready to be integrated into the main application file, where it can be mounted on a specific path (e.g., `/api/transaction`) to handle requests related to transactions within the banking application.
// This setup is essential for building a robust banking application that can handle various transaction types and user interactions efficiently.
// The routes defined here are crucial for the transaction functionality of the banking application, allowing users to interact with their accounts and perform necessary financial operations seamlessly.
// The modular structure of the code promotes better organization and maintainability, making it easier to manage different aspects of the banking application.
// The use of Express Router allows for a clean and structured way to define routes, making it easier to expand and modify the application's routing logic in the future.
// The code is designed to handle requests related to transactions, ensuring that users can perform actions like sending money, checking their transaction history, and verifying specific transactions.
// The routes are designed to handle requests related to transactions, ensuring that users can perform actions like sending money, checking their transaction history, and verifying specific transactions.
// The modular structure of the code promotes better organization and maintainability, making it easier to manage different aspects of the banking application.
// The use of Express Router allows for a clean and structured way to define routes, making it easier to expand and modify the application's routing logic in the future.
// The code is ready to be integrated into the main application file, where it can be mounted on a specific path (e.g., `/api/transaction`) to handle requests related to transactions within the banking application.      