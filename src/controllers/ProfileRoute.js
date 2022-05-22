const { updateRequestDB } = require('../models/ProfileModel');
const { successResponce, failResponce } = require('../utils/helpers');

async function updateProfile(req, res) {
  const { FirstName, Password, LastName, DoB } = req.body;
  console.log('req.params', req.params);
  console.log('req.params.id', req.params.id);
  const newUserData = {
    Password,
    FirstName,
    LastName,
    DoB,
    ID: req.params.id,
  };
  console.log(newUserData);
  const dbResponseInJS = await updateRequestDB(newUserData);

  console.log('dbResponseInJS', dbResponseInJS);
  res.json({ done: 'done' });
  //success state
  //   if (dbResponseInJS.affectedRows === 1)
  //     return successResponce(res, {
  //       affectedRows: dbResponseInJS.affectedRows,
  //       insertId: dbResponseInJS.insertId,
  //     });

  //   //fail state
  //   const { success, sqlMessage } = dbResponseInJS;
  //   if (success === false) {
  //     sqlMessage.includes('Duplicate') && failResponce(res, 'User already exist');
  //     sqlMessage.includes('Incorrect arguments') &&
  //       failResponce(res, 'Incorrect arguments');
  //   }
}

module.exports = {
  updateProfile,
};
