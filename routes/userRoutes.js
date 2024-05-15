const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');


router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.delete('/delete', authenticate, UserController.delete);
router.put('/modify', authenticate, UserController.modify);



module.exports = router;
