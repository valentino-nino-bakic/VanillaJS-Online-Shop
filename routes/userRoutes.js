const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');


router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.post('/delete', UserController.delete);
router.post('/modify', UserController.modify);



module.exports = router;
