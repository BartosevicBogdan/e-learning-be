const {
  createLectureDB,
  getLecturesDB,
  getLectureByIDinDB,
} = require('../models/LecturesModel');
const { successResponce, failResponce } = require('../utils/helpers');

async function createLecture(req, res) {
  const { Title, Brief, Content } = req.body;

  const newUserData = {
    AuthorID: req.user.ID,
    Title,
    Brief,
    Content,
  };
  console.log('newUserData', newUserData);
  const dbResponseInJS = await createLectureDB(newUserData);

  console.log('dbResponseInJS', dbResponseInJS);

  res.json({ done: 'done' });
}

async function getLectures(req, res) {
  //   const { Title, Brief, Content } = req.body;

  //   const newUserData = {
  //     AuthorID: req.user.ID,
  //     Title,
  //     Brief,
  //     Content,
  //   };
  //   console.log('newUserData', newUserData);
  const dbResponseInJS = await getLecturesDB();

  console.log('dbResponseInJS', dbResponseInJS);

  res.json({ data: dbResponseInJS });
}

async function getLectureByID(req, res) {
  //   const { Title, Brief, Content } = req.body;

  //   const newUserData = {
  //     AuthorID: req.user.ID,
  //     Title,
  //     Brief,
  //     Content,
  //   };
  //   console.log('newUserData', newUserData);
  const dbResponseInJS = await getLectureByIDinDB(req.params.ID);

  console.log('dbResponseInJS', dbResponseInJS);

  res.json({ data: dbResponseInJS });
}

module.exports = {
  createLecture,
  getLectures,
  getLectureByID,
};
