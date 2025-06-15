const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
// This code defines a Mongoose schema for transactions in a MongoDB database.
// It includes fields for the sender and receiver (both referencing the User model),
// the amount of money transferred, an optional description, and the date of the transaction.
//
// The schema is then exported as a Mongoose model named 'Transaction'.
//
// This model can be used to create, read, update, and delete transaction records in the database.
//
//     res.status(200).json({ sent, received });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };
// const mongoose = require('mongoose');                    
// const transactionSchema = new mongoose.Schema({
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   amount: { type: Number, required: true },
//   description: { type: String },
//   date: { type: Date, default: Date.now }
// });
// 