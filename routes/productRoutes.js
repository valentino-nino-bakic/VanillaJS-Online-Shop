const express = require('express');
const router = express.Router();
const { ProductController } = require('../controllers/productController');



router.get('/products/:id', ProductController.getProduct);
router.get('/products', ProductController.getProducts);
router.post('/products', ProductController.addProduct);


module.exports = router;
