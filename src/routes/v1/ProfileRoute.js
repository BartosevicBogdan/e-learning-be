const express = require('express');
const router = express.Router();

const { updateProfile } = require('../../controllers/ProfileRoute');
const { isAuthorized } = require('../../middleware/isAuthorized');

router.put('/update/:id', isAuthorized, updateProfile);

module.exports = router;
