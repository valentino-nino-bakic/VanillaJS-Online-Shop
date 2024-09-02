// redirection
if (localStorage.getItem('token') && location.pathname === '/') {
    location.href = 'profile';
}



// imports
import { backToTopButtonToggler, headerToggler, scrollToTop, scrollToProductSection, scrollToCustomerReviewsSection, scrollToWhatWeDoSection } from '../utils/listeners_callbacks.js';

import Login_Register from '../classes/Login_Register.js';
import Cart from '../classes/Cart.js';
import Product from '../classes/Product.js';



// classes initialization
let login_register;
let shoppingCart;
let product;

window.addEventListener('DOMContentLoaded', () => {
    const usernameOrEmail = document.querySelector('#username_or_email');
    const password = document.querySelector('#password');
    const newUsername = document.querySelector('#new-username');
    const newEmail = document.querySelector('#new-email');
    const newPassword = document.querySelector('#new-password');
    login_register = new Login_Register(usernameOrEmail, password, newUsername, newEmail, newPassword);

    shoppingCart = Cart.getInstance();

    product = new Product();
    product.fetchProducts();
});




// ui/ux
window.addEventListener('scroll', () => {
    backToTopButtonToggler();
    headerToggler();
});

document.querySelector('.scroll-to-top-button').addEventListener('click', scrollToTop);

document.querySelector('#animate-arrow').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});

document.querySelector('#fa-products-section-trigger').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});

document.querySelector('#fa-customer-products-section-trigger').addEventListener('click', () => {
    scrollToCustomerReviewsSection(document.querySelector('.customer-reviews-section'));
});

document.querySelector('#learn-more-button').addEventListener('click', () => {
    scrollToWhatWeDoSection(document.querySelector('.what-we-do-section'));
});
