const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const adminViewRouter = require('./src/routes/adminViewRoutes');

const adminApiRouter = require('./src/routes/adminApiRoutes');
const userRouter = require('./src/routes/userRoutes');
const productRouter = require('./src/routes/productRoutes');
const cartRouter = require('./src/routes/cartRoutes');
const contactMessageRouter = require('./src/routes/contactMessageRoutes');

const { renderProductPage } = require('./src/controllers/productController');


app.use(express.json());
app.use(cors);
app.use(express.static('dist'));
app.set('view engine', 'ejs');


async function connectToDatabase() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);
        console.log('Successfully connected with our database!');
    } catch (error) {
        console.log(error);
    }
}
connectToDatabase();




// api routes
app.use('/api', adminApiRouter);
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', contactMessageRouter);




// view routes
app.use('/admin', adminViewRouter);


app.get('/', (req, res) => {
    res.render('index');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/about', (req, res) => {
    res.render('about_us');
});
app.get('/profile', (req, res) => {
    res.render('profile');
});
app.get('/product/:id', renderProductPage);


app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
