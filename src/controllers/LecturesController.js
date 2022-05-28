const {
  createLectureDB,
  getLecturesDB,
  getLectureByIDinDB,
} = require('../models/LecturesModel');
const { successResponce, failResponce } = require('../utils/helpers');

async function createLecture(req, res) {
  const { Title, Brief, Content } = req.body;

  if (!Title || !Brief || !Content) {
    return failResponce(res, 'Not received all fields');
  }
  const newUserData = {
    AuthorID: req.user.ID,
    Title,
    Brief,
    Content,
  };
  // console.log('newUserData', newUserData);
  const dbResponseInJS = await createLectureDB(newUserData);

  // console.log('dbResponseInJS', dbResponseInJS);
  !!dbResponseInJS.affectedRows && dbResponseInJS.insertId
    ? successResponce(res, { msg: 'lecture created' })
    : failResponce(res, 'Credentials not valid');
}

async function getLectures(req, res) {
  const dbResponseInJS = await getLecturesDB();

  // console.log('dbResponseInJS', dbResponseInJS);

  return dbResponseInJS.length !== 0
    ? successResponce(res, dbResponseInJS)
    : failResponce(res, 'Credentials not valid');
}

async function getLectureByID(req, res) {
  const dbResponseInJS = await getLectureByIDinDB(req.params.ID);

  // console.log('dbResponseInJS', dbResponseInJS);
  return dbResponseInJS.length !== 0
    ? successResponce(res, dbResponseInJS)
    : failResponce(res, `Lecture not found by this id:${req.params.ID}`);
}

module.exports = {
  createLecture,
  getLectures,
  getLectureByID,
};
