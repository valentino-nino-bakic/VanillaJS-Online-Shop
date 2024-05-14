const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



const UserController = {


    signup: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const usernameOccupied = await User.findOne({ username: username });
            if (usernameOccupied) {
                return res.status(400).json({ message: `Username ${usernameOccupied} already exists, try with different one...` });
            }

            const newUserData = {
                username: username,
                email: email,
                password: password
            }
            const newUser = new User(newUserData);

            await newUser.save();
            return res.status(201).json({ message: 'You have been successfully registered!\nYou can now proceed to log in to your account!' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },




    login: async (req, res) => {
        try {
            const { usernameOrEmail, password } = req.body;
            const user = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] });
            if (!user || user.password !== password) {
                return res.status(401).json({ message: 'Invalid username/email or password' });
            }

            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'You have been successfully logged in!', token: token });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },




    delete: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(401).json({ message: 'Operation failed, try again later...' });
            }

            await User.findByIdAndDelete(userId);
            return res.status(204).json({ message: 'You have successfully deleted your account!' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },




    modify: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            if (!user) {
                return res.status(401).json({ message: 'Operation failed, try again later...' });
            }

            const modifiedUserData = req.body;
            await User.findByIdAndUpdate(userId, modifiedUserData, { new: true });
            return res.status(201).json({ message: 'You have successfully modified your account!' });

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }


}





module.exports = UserController;
