const express = require('express');
const router = express.Router();

const {
  updateProfile,
  getUserDataByDynamicID,
} = require('../../controllers/ProfileController');
const { isAuthorized } = require('../../middleware/isAuthorized');

router.get('/get/:id', isAuthorized, getUserDataByDynamicID);
router.put('/update/:id', isAuthorized, updateProfile);

module.exports = router;
