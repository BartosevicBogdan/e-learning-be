const {
  createLectureDB,
  getLecturesDB,
  myLecturesDB,
  getLectureByIDinDB,
  archiveLectureDB,
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

  // console.log('createLecture, newUserData', newUserData);

  const dbResponseInJS = await createLectureDB(newUserData);

  // console.log('createLecture, dbResponseInJS', dbResponseInJS);

  !!dbResponseInJS.affectedRows && dbResponseInJS.insertId
    ? successResponce(res, { msg: 'lecture created' })
    : failResponce(res, 'Credentials not valid');
}

async function myLectures(req, res) {
  // console.log('myLectures, req.params.ID', req.params.ID);
  // console.log('myLectures, req.user.ID', req.user.ID);

  const IdToPass = req.params.ID === 'undefined' ? req.user.ID : req.params.ID;

  const dbResponseInJS = await myLecturesDB(IdToPass);

  // console.log('myLectures, dbResponseInJS', dbResponseInJS);

  dbResponseInJS.length > 0
    ? successResponce(res, dbResponseInJS)
    : failResponce(res, { msg: `You don't have lectures, yet` });
}

async function getLectures(req, res) {
  const dbResponseInJS = await getLecturesDB();

  // console.log('getLectures, dbResponseInJS', dbResponseInJS);

  return dbResponseInJS.length !== 0
    ? successResponce(res, dbResponseInJS)
    : failResponce(res, { msg: 'Lectures not found' });
}

async function getLectureByID(req, res) {
  const dbResponseInJS = await getLectureByIDinDB(req.params.ID);

  // console.log('getLectureByID, dbResponseInJS', dbResponseInJS);

  return dbResponseInJS.length !== 0
    ? successResponce(res, dbResponseInJS)
    : failResponce(res, {
        msg: `Lecture not found by this id:${req.params.ID}`,
      });
}

async function archiveLecture(req, res) {
  // console.log('req.params.ID', req.params.ID);

  const dbResponseInJS = await archiveLectureDB(Number(req.params.ID));
  // console.log('archiveLecture, dbResponseInJS', dbResponseInJS);

  return dbResponseInJS.affectedRows
    ? successResponce(res, dbResponseInJS)
    : failResponce(res, {
        msg: `Delete action denied. Lecture not found by this id:${req.params.ID}`,
      });
}

module.exports = {
  createLecture,
  getLectures,
  getLectureByID,
  myLectures,
  archiveLecture,
};
