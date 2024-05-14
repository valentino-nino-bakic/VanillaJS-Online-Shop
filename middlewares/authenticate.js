const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require('../models/userModel');


async function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const validToken = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(validToken.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token, user does not exist' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}



module.exports = authenticate;
