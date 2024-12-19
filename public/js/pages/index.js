// redirection
// if (localStorage.getItem('token') && location.pathname === '/') {
//     location.href = 'profile';
// }
window.addEventListener('DOMContentLoaded', function () {
    if (localStorage.getItem('token') && location.pathname === '/') {
        location.href = '/profile';
    }
});




// imports
import {
    headerToggler,
    backToTopButtonToggler,
    scrollToTop,
    scrollToProductSection,
    scrollToCustomerReviewsSection,
    scrollToWhatWeDoSection,
    toggleHamburgerMenu,
    toggleSearchInput
} from '../utils/listeners_callbacks.js';

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
    product.fetchProducts().then(() => {
        product.addProductSearchListener();
    });
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



const hamburgerMenuIcon = document.querySelector('#hamburger-menu-icon');
const nav = document.querySelector('#navbar');

hamburgerMenuIcon.addEventListener('click', () => {
    toggleHamburgerMenu(nav, document.querySelector('header'));
});


const searchIcon = document.querySelector('#search-icon');
const searchInput = document.querySelector('#search-input');
searchIcon.addEventListener('click', () => {
    toggleSearchInput(searchInput);
});
