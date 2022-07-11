const express = require('express');
const { get_product, addNewProduct, update_selected_product, delete_selected_product, getByBarcode} = require('../controllers/productController');

const router = express.Router();
const { userControl } = require('../middlewares/authMiddleware');

// zincirleme route oluşturma
router.route('/').get( userControl, get_product).post(userControl ,addNewProduct); 
router.route('/:id').put(userControl ,update_selected_product).delete(userControl ,delete_selected_product);
router.route('/:barcode').get(userControl, getByBarcode);


module.exports = router;