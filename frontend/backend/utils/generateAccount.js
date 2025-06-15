function generateAccountNumber() {
  return '30' + Math.floor(10000000 + Math.random() * 90000000);
}

module.exports = generateAccountNumber;

// This function generates a random account number starting with '30' followed by 8 random digits.
// It can be used to create unique account numbers for virtual accounts in a banking application.
// The account number format can be adjusted as needed, and additional logic can be added to ensure uniqueness if required.