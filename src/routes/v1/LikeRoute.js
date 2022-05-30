const express = require('express');
const router = express.Router();

const { invertLike, getLikes } = require('../../controllers/LikeController');
const { isAuthorized } = require('../../middleware/isAuthorized');

router.post('/invert', isAuthorized, invertLike);
router.post('/get', isAuthorized, getLikes);

module.exports = router;
