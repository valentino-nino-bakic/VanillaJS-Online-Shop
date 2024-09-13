const Product = require('../models/productModel');



const ProductController = {

    getProduct: async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json({ product: product });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },


    getProducts: async (req, res) => {
        try {
            const products = await Product.find();
            return res.status(200).json({ products: products });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    },


    addProduct: async (req, res) => {
        try {
            const { productCategory, productImageUrl, productTitle, productDescription, productPrice, inStock } = req.body;
            const newProductData = {
                productCategory: productCategory,
                productImageUrl: productImageUrl,
                productTitle: productTitle,
                productDescription: productDescription,
                productPrice: productPrice,
                inStock: inStock,
            }
            const newProduct = new Product(newProductData);
            await newProduct.save();
            return res.status(201).json({ message: 'New product successfully added!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    }
    
}





const renderProductPage = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).render('not_found');
        }
        res.render('product', { product });
    } catch (error) {
        res.status(500).send('Internal server error.');
    }
}





module.exports = { ProductController, renderProductPage };
