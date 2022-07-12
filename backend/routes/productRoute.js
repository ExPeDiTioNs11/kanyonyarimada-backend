const express = require('express');
const { get_product, addNewProduct, update_selected_product, delete_selected_product, getByBarcode, getById} = require('../controllers/productController');

const router = express.Router();
const { userControl } = require('../middlewares/authMiddleware');

// zincirleme route oluşturma
router.route('/').get(get_product).post(addNewProduct); 
router.route('/:id').put(update_selected_product).delete(delete_selected_product).get(getById);
router.route('/:barcode').get(getByBarcode);

module.exports = router;
