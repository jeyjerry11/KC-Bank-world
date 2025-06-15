const axios = require('axios');

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;

const initiateFlutterwaveAccount = async (user) => {
  const response = await axios.post(
    "https://api.flutterwave.com/v3/virtual-account-numbers",
    {
      email: user.email,
      bvn: user.bvn,
      is_permanent: true,
      tx_ref: "KCBANK_" + Date.now()
    },
    {
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
      },
    }
  );

  console.log("🎉 Virtual account created:", response.data);
  return response.data;
};

module.exports = { initiateFlutterwaveAccount };
// This service handles interactions with the Flutterwave API for creating virtual accounts and sending money to other banks.
// It uses the axios library to make HTTP requests and requires the FLW_SECRET_KEY from environment variables.
// The `initiateFlutterwaveAccount` function takes a user object with email and bvn, and creates a virtual account for the user.