const express = require('express');
const { user_register, user_login, get_user, get_myInfo, delete_selected_user } = require('../controllers/userController');
const { userControl } = require('../middlewares/authMiddleware')
const router = express.Router();

router.post('/register', user_register);
router.post('/login', user_login);
router.get('/getUser', get_user);
router.get('/getmyInfo', get_myInfo);
router.delete('/:id', delete_selected_user);

module.exports = router
