import Cart from "../classes/Cart.js";


// cart functionality
let shoppingCart;
window.addEventListener('DOMContentLoaded', () => {
    shoppingCart = Cart.getInstance();
});





// UI
window.addEventListener('scroll', headerToggler);
function headerToggler() {
    if (window.scrollY > document.querySelector('header').getBoundingClientRect().top) {
        document.querySelector('header').classList.add('toggle-main-header')
    } else {
        document.querySelector('header').classList.remove('toggle-main-header');
    }
}



const hamburgerMenuIcon = document.querySelector('#hamburger-menu-icon');
const nav = document.querySelector('#navbar');
let isOpen = false;

hamburgerMenuIcon.addEventListener('click', () => {
    if (!isOpen) {
      gsap.to(nav, { top: '100%', opacity: 1, duration: .8, ease: Power4.easeOut });
      isOpen = true;
      document.querySelector('header').style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
      gsap.to(nav, { top: '-100vh', opacity: 0, duration: .3, ease: 'power2.inOut' });
      isOpen = false;
      document.querySelector('header').style.backgroundColor = ''
    }
});
