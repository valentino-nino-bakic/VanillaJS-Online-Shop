const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authenticate = require('../middlewares/authenticate');


router.get('/users/:id', UserController.getUser);
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.delete('/delete/:id', authenticate, UserController.delete);
router.put('/modify/:id', authenticate, UserController.modify);



module.exports = router;
