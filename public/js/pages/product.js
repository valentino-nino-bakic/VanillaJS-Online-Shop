import Cart from "../classes/Cart.js";
import Profile from "../classes/Profile.js";
import Login_Register from "../classes/Login_Register.js";

// core
let shoppingCart;
let profile;
let login_register;
window.addEventListener('DOMContentLoaded', () => {
    shoppingCart = Cart.getInstance();

    const newModifiedUsername = document.querySelector('#new-modified-username');
    const newModifiedPassword = document.querySelector('#new-modified-password');
    const currentUserPassword = document.querySelector('#current-user-password');
    const confirmAccountDeletionPassword = document.querySelector('#confirm-account-deletion-password');
    profile = new Profile(newModifiedUsername, newModifiedPassword, currentUserPassword, confirmAccountDeletionPassword);

    const usernameOrEmail = document.querySelector('#username_or_email');
    const password = document.querySelector('#password');
    const newUsername = document.querySelector('#new-username');
    const newEmail = document.querySelector('#new-email');
    const newPassword = document.querySelector('#new-password');
    login_register = new Login_Register(usernameOrEmail, password, newUsername, newEmail, newPassword);
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




function openModal(modalWrapper) {
    modalWrapper.style.display = 'flex';
    document.body.classList.add('disable-scroll');
    document.documentElement.classList.add('disable-scroll');
}
function closeModal(modalWrapper) {
    modalWrapper.style.display = 'none';
    document.body.classList.remove('disable-scroll');
    document.documentElement.classList.remove('disable-scroll');
}


document.querySelectorAll('.image-modal-trigger').forEach(imageModalTrigger => {
    imageModalTrigger.addEventListener('click', () => {
        openModal(document.querySelector('.image-modal-wrapper'));
    });
});

document.querySelectorAll('.close-image-modal-button').forEach(button => {
    button.addEventListener('click', e => {
        closeModal(e.target.parentElement.parentElement);
    });
});



document.querySelectorAll('.image-modal-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', e => {
        if (e.target === wrapper) {
            closeModal(wrapper);
        }
    });
});
