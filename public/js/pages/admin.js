// redirection
if (!localStorage.getItem('token') && location.pathname === '/admin') {
    location.href = '/';
}



// imports
import {
    headerToggler,
    backToTopButtonToggler,
    scrollToTop,
    toggleHamburgerMenu
} from '../utils/listeners_callbacks.js';

import Admin from '../classes/Admin.js';




// class initialization
let admin;
window.addEventListener('DOMContentLoaded', () => {
    admin = new Admin();
});




// ui/ux
window.addEventListener('scroll', headerToggler);
window.addEventListener('scroll', backToTopButtonToggler);
document.querySelector('.scroll-to-top-button').addEventListener('click', scrollToTop);



const hamburgerMenuIcon = document.querySelector('#hamburger-menu-icon');
const nav = document.querySelector('#navbar');

hamburgerMenuIcon.addEventListener('click', () => {
    toggleHamburgerMenu(nav, document.querySelector('header'));
});
