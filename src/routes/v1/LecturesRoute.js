const express = require('express');
const router = express.Router();

const {
  createLecture,
  getLectures,
  getLectureByID,
  myLectures,
  archiveLecture,
} = require('../../controllers/LecturesController');
const { isAuthorized } = require('../../middleware/isAuthorized');

router.post('/create', isAuthorized, createLecture);
router.get('/get', isAuthorized, getLectures);
router.get('/get/:ID', getLectureByID);
router.get('/myLectures/:ID', isAuthorized, myLectures);
router.delete('/delete/:ID', isAuthorized, archiveLecture);

module.exports = router;
