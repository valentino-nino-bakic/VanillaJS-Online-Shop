const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');



router.delete('/admin/users/:id', AdminController.deleteUser);




module.exports = router;
