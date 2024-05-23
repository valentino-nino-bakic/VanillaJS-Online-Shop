const mongoose = require('mongoose');


const User = mongoose.model('User', {
    username: { type: String, required: true, unique: true, minlength: 4, maxlength: 15 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 7, maxlength: 25 }
});



module.exports = User;
