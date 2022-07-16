const express = require('express')
const { get_allCustomers, add_new_customer} = require('../controllers/customerController');

const router = express.Router()
const { userControl } = require('../middlewares/authMiddleware')

router.route('/').get(get_allCustomers).post(add_new_customer)


module.exports = router;
