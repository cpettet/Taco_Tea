const csrf = require("csurf");
const asyncHandler = (handler) => (req, res, next) =>
  handler(req, res, next).catch(next);

const bcrypt = require("bcryptjs");
const csrfProtection = csrf({ cookie: true });

const hashPassword = async (password) => {
  // generate salt
  const salt = await bcrypt.genSalt(12);
  // hash the password
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const comparePassword = async (password, hashedPassword) => {
  const compare = await bcrypt.compare(password, hashedPassword.toString());
  return compare;
};

module.exports = {
  asyncHandler,
  csrfProtection,
  hashPassword,
  comparePassword,
};
