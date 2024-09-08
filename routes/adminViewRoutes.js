const express = require('express');
const router = express.Router();

const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const ContactMessage = require('../models/contactMessageModel');




router.get('/', async (req, res) => {
    const users = await User.find();
    res.render('admin', { username: 'YORKSHIRE', section: 'users', users: users });
});

router.get('/users', async (req, res) => {
    const users = await User.find();
    res.render('admin', { username: 'YORKSHIRE', section: 'users', users: users });
});

router.get('/products', async (req, res) => {
    const products = await Product.find();
    res.render('admin', { username: 'YORKSHIRE', section: 'products', products: products });
});

router.get('/orders', async (req, res) => {
    const orders = await Cart.find();
    res.render('admin', { username: 'YORKSHIRE', section: 'orders', orders: orders });
});

router.get('/messages', async (req, res) => {
    const messages = await ContactMessage.find();
    res.render('admin', { username: 'YORKSHIRE', section: 'messages', messages: messages });
});

router.get('/settings', (req, res) => {
    res.render('admin', { username: 'YORKSHIRE', section: 'settings' });
});




module.exports = router;
