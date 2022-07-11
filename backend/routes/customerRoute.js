const express = require('express')
const { get_allCustomers, add_new_customer, update_customer, delete_customer} = require('../controllers/customerController');

const router = express.Router()
const { userControl } = require('../middlewares/authMiddleware')

router.route('/').get(get_allCustomers).post(add_new_customer)
router.route('/:id').put(update_customer).delete(delete_customer);


module.exports = router;
