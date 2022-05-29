const { updateRequestDB, getUserDB } = require('../models/ProfileModel');
const { successResponce, failResponce } = require('../utils/helpers');

async function getUserDataByDynamicID(req, res) {
  // const { FirstName, Password, LastName, DoB } = req.body;

  console.log('req.user.id', req.user);
  console.log('req.params', req.params);
  console.log('req.params.id', req.params.id);
  // const newUserData = {
  //   Password,
  //   FirstName,
  //   LastName,
  //   DoB,
  //   ID: req.params.id,
  // };
  // console.log(newUserData);
  const findBy = req.params.id === 'undefined' ? req.user.ID : req.params.id;
  console.log('findBy', findBy);
  const dbResponseInJS = await getUserDB([findBy]);

  console.log('dbResponseInJS', dbResponseInJS);
  // res.json({ done: 'done' });
  //success state
  if (dbResponseInJS) return successResponce(res, { ...dbResponseInJS[0] });

  //   //fail state
  //   const { success, sqlMessage } = dbResponseInJS;
  //   if (success === false) {
  //     sqlMessage.includes('Duplicate') && failResponce(res, 'User already exist');
  //     sqlMessage.includes('Incorrect arguments') &&
  //       failResponce(res, 'Incorrect arguments');
  //   }
}
async function updateProfile(req, res) {
  const { FirstName, LastName, DoB, Avatar } = req.body;
  // console.log('req.params', req.params);
  // console.log('req.params.id', req.params.id);
  console.log('req.user.ID', req.user.ID);
  const newUserData = {
    FirstName,
    LastName,
    DoB,
    Avatar,
    ID: req.user.ID,
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
  getUserDataByDynamicID,
};
