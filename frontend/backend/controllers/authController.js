const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

const generateAccountNumber = () => {
  return "KC" + Math.floor(1000000000 + Math.random() * 9000000000);
};

exports.signup = async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const accountNumber = generateAccountNumber();
  const verificationToken = crypto.randomBytes(20).toString("hex");

  const user = await User.create({
    fullName,
    email,
    phone,
    password: hashedPassword,
    accountNumber,
    verificationToken,
  });

  const emailContent = `
    <h2>Welcome to KC Bank, ${fullName}!</h2>
    <p>Click below to verify your email:</p>
    <a href="http://localhost:5000/api/auth/verify/${verificationToken}">Verify Email</a>
  `;

  await sendEmail(email, "Verify Your Email", emailContent);

  res.json({ message: "Signup successful. Please verify your email!" });
};

exports.verifyEmail = async (req, res) => {
  const user = await User.findOne({ verificationToken: req.params.token });

  if (!user) return res.status(400).send("Invalid token");

  user.emailVerified = true;
  user.verificationToken = "";
  await user.save();

  res.send("Email verified successfully. You may now login.");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send("Invalid password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "2d" });

  res.json({ token, user });
};
