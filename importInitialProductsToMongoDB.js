const mongoose = require('mongoose');
require('dotenv').config();
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const Product = require('./src/models/productModel');
const initialMongoDB_Products = require('./initialMongoDB_Products.json');



const init = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);
        importInitialProductsToMongoDB();
    } catch (error) {
        console.log(error);
    }
}
init();



const importInitialProductsToMongoDB = async () => {
    try {
        const productPromise = initialMongoDB_Products.map(product => {
            const newProduct = new Product({
                productCategory: product.productCategory,
                productImageUrl: product.productImageUrl,
                productTitle: product.productTitle,
                productDescription: product.productDescription,
                productPrice: product.productPrice,
                inStock: product.inStock
            });
            return newProduct.save();
        });
        await Promise.all(productPromise);
        console.log('Products have been successfully imported to your Mongo database!');
    } catch (error) {
        console.log('Error importing products:', error);
    } finally {
        mongoose.connection.close();
    }
}
