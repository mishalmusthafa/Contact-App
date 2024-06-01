const express = require('express');
const router = express.Router();
const { userLogin, userRegister, getMe } = require('../controller/userController');
const { protect } = require('../middleware/authMiddleware');


router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/me', protect, getMe);

module.exports = router;