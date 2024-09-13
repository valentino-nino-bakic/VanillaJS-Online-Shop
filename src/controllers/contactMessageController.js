const ContactMessage = require('../models/contactMessageModel');



const ContactMessageController = {
    sendMessage: async (req, res) => {
        try {
            const { name, email, subject, message, createdAt } = req.body;

            const newContactMessageData = {
                name: name || '',
                email: email,
                subject: subject || '',
                message: message,
                createdAt: createdAt
            }

            const newContactMessage = new ContactMessage(newContactMessageData);
            await newContactMessage.save();

            return res.status(201).json({ message: 'Your message has been successfully sent!' });
        } catch (error) {
            console.error(error);
        }
    }
}





module.exports = ContactMessageController;
