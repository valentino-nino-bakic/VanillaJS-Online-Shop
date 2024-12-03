// redirection
// if (!localStorage.getItem('token') && location.pathname === '/profile') {
//     location.href = '/';
// }
window.addEventListener('DOMContentLoaded', function () {
    if (!localStorage.getItem('token') && location.pathname === '/profile') {
        location.href = '/';
    }
});


// imports
import {
    headerToggler,
    backToTopButtonToggler,
    scrollToTop,
    scrollToProductSection,
    scrollToWhatWeDoSection,
    scrollToCustomerReviewsSection,
    toggleHamburgerMenu
} from '../utils/listeners_callbacks.js';



import Product from '../classes/Product.js';
import Cart from '../classes/Cart.js'
import Profile from '../classes/Profile.js';



// classes initialization
let profile;
let shoppingCart;
let product;
window.addEventListener('DOMContentLoaded', () => {
    const newModifiedUsername = document.querySelector('#new-modified-username');
    const newModifiedPassword = document.querySelector('#new-modified-password');
    const currentUserPassword = document.querySelector('#current-user-password');
    const confirmAccountDeletionPassword = document.querySelector('#confirm-account-deletion-password');
    profile = new Profile(newModifiedUsername, newModifiedPassword, currentUserPassword, confirmAccountDeletionPassword);

    shoppingCart = Cart.getInstance();

    product = new Product();
    product.fetchProducts().then(() => {
        product.addProductSearchListener();
    });
});




// ui/ux
window.addEventListener('scroll', headerToggler);
window.addEventListener('scroll', backToTopButtonToggler);
document.querySelector('.scroll-to-top-button').addEventListener('click', scrollToTop);


document.querySelector('#animate-arrow').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});

document.querySelector('#learn-more-button').addEventListener('click', () => {
    scrollToWhatWeDoSection(document.querySelector('.what-we-do-section'));
});

document.querySelector('#fa-products-section-trigger').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});

document.querySelector('#fa-customer-products-section-trigger').addEventListener('click', () => {
    scrollToCustomerReviewsSection(document.querySelector('.customer-reviews-section'));
});



const hamburgerMenuIcon = document.querySelector('#hamburger-menu-icon');
const nav = document.querySelector('#navbar');

hamburgerMenuIcon.addEventListener('click', () => {
    toggleHamburgerMenu(nav, document.querySelector('header'));
});






export {
    shoppingCart,
}
