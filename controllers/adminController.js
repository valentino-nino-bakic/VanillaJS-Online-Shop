// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const SECRET_KEY = process.env.SECRET_KEY;
const User = require('../models/userModel');



const AdminController = {


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
