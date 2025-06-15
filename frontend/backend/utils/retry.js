const axios = require('axios');
const retryTransfer = async (payload, headers, retries = 3, delay = 10000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.post('https://api.flutterwave.com/v3/transfers', payload, { headers });
      if (res.data.status === 'success') return res.data;
    } catch (err) {
      console.log(`Retry ${i + 1} failed...`);
    }
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  // Refund logic here if all retries fail
  return { status: 'failed', message: 'All retries failed. Initiating refund.' };
};

module.exports = { retryTransfer };
// This utility function handles retry logic for sending money transfers using the Flutterwave API.
// It attempts to send the transfer request multiple times with a delay between attempts.
// If all attempts fail, it returns a failure message and can include refund logic.
// This code defines a utility function for retrying money transfers using the Flutterwave API.