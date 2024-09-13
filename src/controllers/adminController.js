// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const SECRET_KEY = process.env.SECRET_KEY;
const User = require('../models/userModel');
const ContactMessage = require('../models/contactMessageModel');
const sendEmail = require('../services/emailService');


const AdminController = {


    replyToMessageViaEmail: async (req, res) => {
        try {
            const { messageId, emailReplyMessage } = req.body;

            const message = await ContactMessage.findById(messageId);
            if (!message) {
                return res.status(404).json({ message: 'Message not found' });
            }

            const subject = message.subject ? `Reply to your message regarding: ${message.subject}` : '';
            const text = `Hello ${message.name ? message.name : ''},\n\n${emailReplyMessage}\n\nAlways here to help you,\nYorkshire Support Team`;

            await sendEmail(message.email, subject, text);

            message.replied = true;
            await message.save();

            return res.status(200).json({ message: 'Reply has been sent successfully!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },




    deleteUser: async (req, res) => {
        try {
            // const password = req.body.password;

            // const validPassword = await bcrypt.compare(password, req.user.password);
            // if (!validPassword) {
            //     return res.status(401).json({ message: 'Invalid password' });
            // }

            await User.findByIdAndDelete(req.user._id);
            return res.status(200).json({ message: 'User has been successfully deleted!' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },



}





module.exports = AdminController;
