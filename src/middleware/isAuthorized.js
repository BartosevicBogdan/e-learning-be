const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const isAuthorized = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    req.user = jwt.verify(token, jwtSecret);
    return next();
  } catch (e) {
    return res.status(401).send({ err: 'Validation failed' });
  }
};

module.exports = { isAuthorized };
