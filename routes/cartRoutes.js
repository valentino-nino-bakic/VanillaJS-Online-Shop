const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const authenticate = require('../middlewares/authenticate');


router.post('/carts', authenticate, CartController.checkout);


module.exports = router;
