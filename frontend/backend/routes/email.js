// routes/email.js
const express = require('express');
const router = express.Router();
const { sendEmailVerification } = require('../controllers/emailController');

router.post('/send', sendEmailVerification);

module.exports = router;
// This code defines a route for sending email verification. It imports the necessary modules and the controller function, then sets up a POST route to handle email verification requests. The router is exported for use in the main application file.