const express = require('express');
const {
  registrationRequest,
  loginRequest,
} = require('../../controllers/AuthController');
const validation = require('../../middleware/validation');
const { userAuthSchema } = require('../../utils/Schemas');
const router = express.Router();

router.post('/register', validation(userAuthSchema), registrationRequest);
router.post('/login', validation(userAuthSchema), loginRequest);

module.exports = router;
