const {
  registrationRequestDB,
  loginRequestDB,
} = require('../models/AuthModel');

const {
  successResponce,
  failResponce,
  hashPass,
  verifyPass,
  createToken,
} = require('../utils/helpers');

async function registrationRequest(req, res) {
  const { Email, Password } = req.body;

  const newUserData = {
    Email,
    Password: hashPass(Password),
  };

  const dbResponseInJS = await registrationRequestDB(newUserData);

  console.log('dbResponseInJS', dbResponseInJS);

  //success state
  if (dbResponseInJS.affectedRows === 1)
    return successResponce(res, {
      affectedRows: dbResponseInJS.affectedRows,
      insertId: dbResponseInJS.insertId,
    });

  //fail state
  const { success, sqlMessage } = dbResponseInJS;
  if (success === false) {
    sqlMessage.includes('Duplicate') && failResponce(res, 'User already exist');
    sqlMessage.includes('Incorrect arguments') &&
      failResponce(res, 'Incorrect arguments');
  }
}

async function loginRequest(req, res) {
  const { Email: email, Password: checkPassword } = req.body;

  const dbResponseInJS = await loginRequestDB({ email });
  const { ID, Email, Password: truePassword } = dbResponseInJS[0];
  console.log('dbResponseInJS[0]', dbResponseInJS[0]);

  const dataToToken = {
    ID,
    Email,
  };

  verifyPass(checkPassword, truePassword)
    ? successResponce(res, { token: createToken(dataToToken, '1w') })
    : failResponce(res, 'Credentials not valid');
}

module.exports = {
  registrationRequest,
  loginRequest,
};
