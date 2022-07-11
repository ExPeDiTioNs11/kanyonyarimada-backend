const express = require('express')
const { get_allCustomers, add_new_customer, update_customer, delete_customer} = require('../controllers/customerController');

const router = express.Router()
const { userControl } = require('../middlewares/authMiddleware')

router.route('/').get( userControl, get_allCustomers).post(userControl ,add_new_customer)
router.route('/:id').put(userControl ,update_customer).delete(userControl ,delete_customer);


module.exports = router;