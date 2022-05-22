const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function successResponce(res, data, status = 200) {
  res.status(status).json({
    success: true,
    data,
  });
}
function failResponce(res, err = 'Something went wrong', status = 500) {
  res.status(status).json({
    success: false,
    error: err,
  });
}

function hashPass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}
function verifyPass(checkPassword, truePassword) {
  return checkPassword && bcrypt.compareSync(checkPassword, truePassword);
}

function createToken(dataObjToToken, expiresIn) {
  return jwt.sign(dataObjToToken, jwtSecret, {
    expiresIn: expiresIn,
  });
}

module.exports = {
  successResponce,
  failResponce,
  hashPass,
  verifyPass,
  createToken,
};
