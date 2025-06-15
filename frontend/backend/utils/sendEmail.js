const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"KC Bank" <${process.env.EMAIL}>`,
    to: email,
    subject,
    html: htmlContent,
  });
};

module.exports = sendEmail;
