const calculateDaysLeft = (expiryDate) => {
  const today = new Date();

  const diff =
    new Date(expiryDate) - today;

  return Math.ceil(
    diff / (1000 * 60 * 60 * 24)
  );
};

module.exports = {
  calculateDaysLeft,
};