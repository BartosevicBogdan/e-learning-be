const { updateRequestDB, getUserDB } = require('../models/ProfileModel');
const { successResponce, failResponce } = require('../utils/helpers');

async function getUserDataByDynamicID(req, res) {
  // console.log('getUserDataByDynamicID, req.user.id', req.user);
  // console.log('getUserDataByDynamicID, req.params', req.params);
  // console.log('getUserDataByDynamicID, req.params.id', req.params.id);

  const findBy = req.params.id === 'undefined' ? req.user.ID : req.params.id;
  // console.log('getUserDataByDynamicID, findBy', findBy);

  const dbResponseInJS = await getUserDB([findBy]);

  return dbResponseInJS
    ? successResponce(res, { ...dbResponseInJS[0] })
    : failResponce(res, { msg: `user with ID = ${findBy} not found` });
}

async function updateProfile(req, res) {
  const { FirstName, LastName, DoB, Avatar } = req.body;

  const newUserData = {
    FirstName,
    LastName,
    DoB,
    Avatar,
    ID: req.user.ID,
  };

  // console.log('updateProfile, newUserData', newUserData);

  const dbResponseInJS = await updateRequestDB(newUserData);
  // console.log('updateProfile, dbResponseInJS', dbResponseInJS);

  return dbResponseInJS
    ? successResponce(res, { msg: `User with ID = ${req.user.ID} was updated` })
    : failResponce(res, {
        msg: `Unsuccessful user update. User ID = ${req.user.ID}`,
      });
}

module.exports = {
  updateProfile,
  getUserDataByDynamicID,
};
