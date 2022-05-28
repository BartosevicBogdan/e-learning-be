const express = require('express');
const router = express.Router();

const {
  createLecture,
  getLectures,
  getLectureByID,
} = require('../../controllers/LecturesController');
const { isAuthorized } = require('../../middleware/isAuthorized');

router.post('/create', isAuthorized, createLecture);
router.get('/get', getLectures);
router.get('/get/:ID', getLectureByID);
// router.put('/update/:id', isAuthorized, updateProfile);

module.exports = router;
