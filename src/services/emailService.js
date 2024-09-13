const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD
    }
});


const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: to,
        subject: subject,
        text: text
    };

    return transporter.sendMail(mailOptions);
};




module.exports = sendEmail;
