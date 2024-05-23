const mongoose = require('mongoose');


const Product = mongoose.model('Product', {
    productCategory: { type: String, required: true },
    productImageUrl: { type: String, required: true },
    productTitle: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true, min: 0 },
    inStock: { type: Number, required: true, min: 0 }
});



module.exports = Product;
