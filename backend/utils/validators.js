const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isStrongPassword = (password) => {
  return password && password.length >= 6;
};

module.exports = {
  isValidEmail,
  isStrongPassword,
};