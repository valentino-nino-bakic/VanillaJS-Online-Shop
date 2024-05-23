const Cart = require('../models/cartModel');



const CartController = {


    checkout: async (req, res) => {
        try {
            const userId = req.user._id;
            const { products } = req.body;

            const newCartData = {
                userId: userId,
                products: products
            }

            const newCart = new Cart(newCartData);
            await newCart.save();
            return res.status(201).json({ message: 'Your order has been successfully processed!' });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },


}





module.exports = CartController;
