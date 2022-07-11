const express = require('express');
const { user_register, user_login, get_user, get_myInfo } = require('../controllers/userController');
const { userControl } = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/register', user_register);
router.post('/login', user_login);
router.get('/getUser', get_user);
router.get('/getmyInfo', get_myInfo)

module.exports = router
