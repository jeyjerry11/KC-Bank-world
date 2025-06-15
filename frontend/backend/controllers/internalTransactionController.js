const User = require('../models/User');
const Transaction = require('../models/Transaction');

// 🤑 KC-to-KC SEND MONEY
exports.sendMoney = async (req, res) => {
  try {
    const { senderId, receiverId, amount, description } = req.body;

    if (!senderId || !receiverId || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'User(s) not found' });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds' });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      description: description || 'Transfer',
      date: new Date(),
    });

    await transaction.save();

    res.status(200).json({ message: 'Transaction successful', transaction });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// 📜 GET USER TRANSACTIONS
exports.getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const sent = await Transaction.find({ sender: userId }).populate('receiver', 'fullName');
    const received = await Transaction.find({ receiver: userId }).populate('sender', 'fullName');

    res.status(200).json({ sent, received });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// 💰 GET BALANCE
exports.getBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// 🔄 UPDATE USER BALANCE
exports.updateBalance = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.balance += amount;
    await user.save();

    res.status(200).json({ message: 'Balance updated successfully', balance: user.balance });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
