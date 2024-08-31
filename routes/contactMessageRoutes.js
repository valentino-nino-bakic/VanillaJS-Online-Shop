const express = require('express');
const router = express.Router();
const ContactMessageController = require('../controllers/contactMessageController');




router.post('/contact-message', ContactMessageController.sendMessage);



module.exports = router;
