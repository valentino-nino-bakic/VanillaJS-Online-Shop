const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendEmail = async (to, subject, text) => {
    const msg = {
        from: process.env.SENDGRID_FROM_EMAIL,
        to: to,
        subject: subject,
        text: text,
    }

    try {
        const response = await sgMail.send(msg);
        console.log(response[0].statusCode);
        console.log(response[0].headers);
    } catch (error) {
        console.error(error);
    }
}



module.exports = sendEmail;
