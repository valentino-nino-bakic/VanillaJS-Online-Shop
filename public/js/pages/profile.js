// Redirection
if (!localStorage.getItem('token') && location.pathname === '/profile') {
    location.href = '/';
}


/* ------------------------------------------------------- IMPORTS ------------------------------------------------------- */
/* Fetch logika, prikazivanje i filtriranje proizvoda... */
import Product from '../classes/Product.js';

/* Korpa */
import Cart from '../classes/Cart.js'

/* Korisnik */
import Profile from '../classes/Profile.js';

/* Event listeners callback funkcije */
import {
    headerToggler,
    backToTopButtonToggler,
    scrollToTop,
    scrollToProductSection,
    scrollToWhatWeDoSection,
    scrollToCustomerReviewsSection,
    toggleHamburgerMenu
} from '../utils/listeners_callbacks.js';
/* ----------------------------------------------------------------------------------------------------------------------- */





let profile;
let shoppingCart;
let product;
window.addEventListener('DOMContentLoaded', () => {
    const newModifiedUsername = document.querySelector('#new-modified-username');
    const newModifiedPassword = document.querySelector('#new-modified-password');
    const currentUserPassword = document.querySelector('#current-user-password');
    const confirmAccountDeletionPassword = document.querySelector('#confirm-account-deletion-password');
    profile = new Profile(newModifiedUsername, newModifiedPassword, currentUserPassword, confirmAccountDeletionPassword);

    shoppingCart = new Cart();

    // Po otvaranju stranice inicijalno prikazujemo proizvode iz kategorije 'Retro Football Jerseys'.
    product = new Product();
    product.updateProducts('Retro Football Jerseys');
});




// Sticky header
window.addEventListener('scroll', headerToggler);

// Back to top button vidljivost
window.addEventListener('scroll', backToTopButtonToggler);

// Nazad na vrh stranice
document.querySelector('.scroll-to-top-button').addEventListener('click', scrollToTop);



/* ------------------------------------------------------            SMOOTH SCROLL LISTENERI              ---------------------------------------------------- */
/* -------------------- Smooth scroll sa vrha do 'PRODUCTS' sekcije -------------------- */
document.querySelector('#animate-arrow').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});

/* --------------------- Smooth scroll do 'WHAT WE DO' sekcije --------------------- */
document.querySelector('#learn-more-button').addEventListener('click', () => {
    scrollToWhatWeDoSection(document.querySelector('.what-we-do-section'));
});

/* --------------------- Smooth scroll do 'PRODUCTS' sekcije --------------------- */
document.querySelector('#fa-products-section-trigger').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});

/* --------------------- Smooth scroll do 'CUSTOMER REVIEWS' sekcije --------------------- */
document.querySelector('#fa-customer-products-section-trigger').addEventListener('click', () => {
    scrollToCustomerReviewsSection(document.querySelector('.customer-reviews-section'));
});







/* --------------------- HAMBURGER MENU --------------------- */
const hamburgerMenuIcon = document.querySelector('#hamburger-menu-icon');
const nav = document.querySelector('#navbar');

hamburgerMenuIcon.addEventListener('click', () => {
    toggleHamburgerMenu(nav, document.querySelector('header'));
});








/* ------------------------------------------------------- EXPORTS ------------------------------------------------------- */
export {
    shoppingCart,
}
