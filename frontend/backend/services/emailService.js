const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendVerificationEmail = async (to, code) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verify Your KC Bank Email',
    html: `<h2>Your verification code is: <strong>${code}</strong></h2>`
  });
};

module.exports = { sendVerificationEmail };

// Usage example:
// const { sendVerificationEmail } = require('./emailService');
// sendVerificationEmail('user@example.com', '123456');
// Make sure to set EMAIL_USER and EMAIL_PASS in your environment variables
// before running this code.
// This code sets up a simple email service using Nodemailer to send verification emails.
// It uses Gmail as the email service provider and requires environment variables for the email user and password.
// The `sendVerificationEmail` function takes an email address and a verification code as parameters and sends an email with the code.
// Make sure to install Nodemailer with `npm install nodemailer` before using this code.