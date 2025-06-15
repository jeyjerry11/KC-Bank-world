const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  phone: String,
  bvn: String,
  accountNumber: String,
  bankName: String,
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
