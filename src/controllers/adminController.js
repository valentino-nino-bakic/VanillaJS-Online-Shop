// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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




    addNewUser: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const usernameOccupied = await User.findOne({ username: username });
            if (usernameOccupied) {
                return res.status(400).json({ message: `Username ${usernameOccupied} already exists, try with different one...` });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUserData = {
                username: username,
                email: email,
                password: hashedPassword,
            }
            const newUser = new User(newUserData);

            await newUser.save();
            return res.status(201).json({ message: 'New user has been successfully created!' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },




    editUser: async (req, res) => {
        try {
            const { adminModifiedUserUsername, adminModifiedUserRole } = req.body;
    
            const usernameOccupied = await User.findOne({ username: adminModifiedUserUsername });
            if (usernameOccupied) {
                return res.status(400).json({ message: `Username ${usernameOccupied} already exists, try with different one...` });
            }
    
            const userId = req.params.id;
            const user = await User.findById(userId);

            user.username = adminModifiedUserUsername;
            user.role = adminModifiedUserRole;
    
            await user.save();
            return res.status(200).json({ message: 'User has been successfully modified!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    },




    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({ message: 'User has been successfully deleted!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },



}





module.exports = AdminController;
