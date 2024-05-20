const mongoose = require('mongoose');


const Product = mongoose.model('Product', {
    productCategory: String,
    productImageUrl: String,
    productTitle: String,
    productDescription: String,
    productPrice: Number,
    inStock: Number
});



module.exports = Product;
