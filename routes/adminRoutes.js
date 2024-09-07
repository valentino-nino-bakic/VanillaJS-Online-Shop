const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('admin', { username: 'YORKSHIRE', section: 'users' });
});

router.get('/users', (req, res) => {
    res.render('admin', { username: 'YORKSHIRE', section: 'users' });
});

router.get('/products', (req, res) => {
    res.render('admin', { username: 'YORKSHIRE', section: 'products' });
});

router.get('/orders', (req, res) => {
    res.render('admin', { username: 'YORKSHIRE', section: 'orders' });
});

router.get('/messages', (req, res) => {
    res.render('admin', { username: 'YORKSHIRE', section: 'messages' });
});

router.get('/settings', (req, res) => {
    res.render('admin', { username: 'YORKSHIRE', section: 'settings' });
});




module.exports = router;
