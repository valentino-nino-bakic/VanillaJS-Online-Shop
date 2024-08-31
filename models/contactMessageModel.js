const mongoose = require('mongoose');


const ContactMessage = mongoose.model('Contact_Message', {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    subject: { type: String, required: false },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});



module.exports = ContactMessage;
