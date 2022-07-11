const express = require('express');
const { get_order, create_new_order, update_order } = require('../controllers/orderController')

const router = express.Router();
const { userControl } = require('../middlewares/authMiddleware');

// zincirleme route oluşturma
router.route('/').get(get_order)
router.route('/:id').post(create_new_order)
router.route('/:id').put(update_order)



module.exports = router;
