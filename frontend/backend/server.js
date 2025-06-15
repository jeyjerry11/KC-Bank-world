const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("🔥 MongoDB Connected"))
  .catch(err => console.error("❌ Mongo Error:", err));

// Your routes go here
app.use('/api/internal', require('./routes/internalTransaction'));
app.use('/api/external', require('./routes/externalTransaction'));

// Default route
app.get('/', (req, res) => {
  res.send('🌍 KC Bank Backend Online');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// Export app for testing