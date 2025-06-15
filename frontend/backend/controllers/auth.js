const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (req, res) => {
  const { fullName, email, password, phone, bvn, accountNumber, bankName } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
    phone,
    bvn,
    accountNumber,
    bankName
  });

  await user.save();
  res.status(201).json({ success: true, message: 'User registered.' });
};

module.exports = { registerUser };
