// navbar animation helper function.
import { headerToggler } from '../utils/listeners_callbacks.js';

// 'ContactMessage' class
import ContactMessage from '../classes/ContactMessage.js';



window.addEventListener('scroll', headerToggler);


let contactMessage;
window.addEventListener('DOMContentLoaded', () => {
    contactMessage = new ContactMessage();
});


/* --------------------- HAMBURGER MENU --------------------- */
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
