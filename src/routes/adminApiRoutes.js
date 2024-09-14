const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/adminController');


router.post('/admin/users/add-new-user', AdminController.addNewUser);
router.post('/admin/messages/email-reply', AdminController.replyToMessageViaEmail);
router.delete('/admin/users/:id', AdminController.deleteUser);




module.exports = router;
