const express = require('express');
const { getService, add_new_service, update_service, deleteService, getByIdService } = require('../controllers/serviceController');
const { userControl } = require('../middlewares/authMiddleware')
const router = express.Router();

// zincirleme route oluşturma
router.route('/').get(getService).post(add_new_service); 
router.route('/:id').put(update_service).delete(deleteService);
router.route)('/:id').get(getByIdService);


module.exports = router
