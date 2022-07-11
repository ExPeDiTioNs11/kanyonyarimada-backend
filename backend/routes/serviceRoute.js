const express = require('express');
const { getService, add_new_service, update_service, deleteService } = require('../controllers/serviceController');
const { userControl } = require('../middlewares/authMiddleware')
const router = express.Router();

// zincirleme route oluşturma
router.route('/').get( userControl, getService).post(userControl ,add_new_service); 
router.route('/:id').put(userControl ,update_service).delete(userControl ,deleteService);


module.exports = router
