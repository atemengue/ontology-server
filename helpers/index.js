/** @format */

const bcrypt = require('bcrypt');

exports.passwordIsValid = (password, thePass) => {
  return bcrypt.compareSync(password, thePass);
};

exports.hasPassword = function (password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
