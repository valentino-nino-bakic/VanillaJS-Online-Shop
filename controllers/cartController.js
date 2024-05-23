const Cart = require('../models/cartModel');



const CartController = {


    checkout: async (req, res) => {
        try {
            const userId = req.user._id;
            const products = req.body;
            let cart = await Cart.findOne({ userId });

            if (!cart) {
                cart = new Cart({ userId, products });
            } else {
                products.forEach(product => {
                    const existingProduct = cart.products.find(p => p.productId === product._id);
                    if (existingProduct) {
                        existingProduct.quantity += product.quantity;
                    } else {
                        cart.products.push(product);
                    }
                });
            }
    
            await cart.save();
            return res.status(200).json({ message: 'Your order has been successfully processed!' });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },


}





module.exports = CartController;
