const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../db/users.json');

const registerUser = async (req, res) => {
  const { fullName, email, phoneNumber } = req.body;
  const newUser = {
    id: Date.now(),
    fullName,
    email,
    phoneNumber,
    balance: 5000000,
  };

  const users = JSON.parse(fs.readFileSync(dbPath));
  users.push(newUser);
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

  res.json({ success: true, user: newUser });
};

module.exports = { registerUser };
// const fs = require('fs');
// const path = require('path');
// const dbPath = path.join(__dirname, '../db/users.json');
//
// const registerUser = async (req, res) => {
//   const { fullName, email, phoneNumber } = req.body;
//   const newUser = {
//     id: Date.now(),
//     fullName,
//     email,
//     phoneNumber,
//     balance: 5000000,
//   };
