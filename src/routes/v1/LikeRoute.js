const express = require('express');
const router = express.Router();

const { invertLike } = require('../../controllers/LikeController');
const { isAuthorized } = require('../../middleware/isAuthorized');

router.post('/invert', isAuthorized, invertLike);

module.exports = router;
