/* ------------------------------------------------------- IMPORTS ------------------------------------------------------- */
/* Unikatni token */
import generateUniqueToken from './token_generator.js';


/* Fetch logika */
import updateProducts from './fetch_display_data.js';


/* Korpa */
import Cart from './cart.js'


/* Korisnik */
import User from './user.js';


/* Event listeners callback funkcije */
import {
    headerToggler,
    backToTopButtonToggler,
    scrollToTop,
    showCart,
    xHidesCart,
    overlayHidesCart,
    scrollToProductSection,
    scrollToWhatWeDoSection,
    scrollToCustomerReviewsSection,
    toggleHamburgerMenu,
    switchCategory,
    placeOrder,
    emptyTheCart
} from './listeners_callbacks.js';
/* ----------------------------------------------------------------------------------------------------------------------- */












/* Unikatni token korisnika */
let token = '';
if (JSON.parse(localStorage.getItem('registeredUser'))) {
    token = JSON.parse(localStorage.getItem('registeredUser')).token;
} else {
    token = generateUniqueToken();
}







// Event listener na 'select' elementu za prikazivanje proizvoda iz izabrane kategorije
const categorySelect = document.getElementById('category-select');
categorySelect.addEventListener('change', () => {
    switchCategory(categorySelect, updateProducts, update_addToCartButtonsStatus);
});



// Po otvaranju stranice inicijalno prikazujemo proizvode iz prve kategorije(men's clothing)
updateProducts(`men's clothing`);
////////////////////////////////////////////////////////////////////////////////////////






// Sticky header
window.addEventListener('scroll', headerToggler);

// Back to top button vidljivost
window.addEventListener('scroll', backToTopButtonToggler);




// Nazad na vrh stranice
document.querySelector('.scroll-to-top-button').addEventListener('click', scrollToTop);



/* ---------------------- OTVARANJE I ZATVARANJE KORPE -------------------*/
const cartIcon = document.querySelector('.cart-icon');
const closeButton = document.querySelector('.x');
const cartToggler = document.querySelector('.cart-toggler-wrapper');

// Prikaz korpe klikom na cart ikonicu
cartIcon.addEventListener('click', () => {
    showCart(cartToggler, shoppingCart);
});

// Zatvaranje korpe klikom na 'X'
closeButton.addEventListener('click', () => {
    xHidesCart(cartToggler)
});

// Zatvaranje korpe klikom na overlay
cartToggler.addEventListener('click', e => {
    if (e.target === cartToggler) {
        overlayHidesCart(cartToggler)
    }
});








/* ------------------------------------------------------            SMOOTH SCROLL LISTENERI              ---------------------------------------------------- */
/* -------------------- Smooth scroll sa vrha do 'PRODUCTS' sekcije -------------------- */
document.querySelector('#animate-arrow').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});
/////////////////////////////////////////////////////////////////////////////////////////

/* --------------------- Smooth scroll do 'WHAT WE DO' sekcije --------------------- */
document.querySelector('#learn-more-button').addEventListener('click', () => {
    scrollToWhatWeDoSection(document.querySelector('.what-we-do-section'));
});
/////////////////////////////////////////////////////////////////////////////////////////

/* --------------------- Smooth scroll do 'PRODUCTS' sekcije --------------------- */
document.querySelector('#fa-products-section-trigger').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});
/////////////////////////////////////////////////////////////////////////////////////////

/* --------------------- Smooth scroll do 'CUSTOMER REVIEWS' sekcije --------------------- */
document.querySelector('#fa-customer-products-section-trigger').addEventListener('click', () => {
    scrollToCustomerReviewsSection(document.querySelector('.customer-reviews-section'));
});
/////////////////////////////////////////////////////////////////////////////////////////







/* --------------------- HAMBURGER MENU --------------------- */
const hamburgerMenuIcon = document.querySelector('#hamburger-menu-icon');
const nav = document.querySelector('#navbar');

hamburgerMenuIcon.addEventListener('click', () => {
    toggleHamburgerMenu(nav, document.querySelector('header'));
});
/////////////////////////////////////////////////////////////////////////////////////////












/* --------------------------------------------------------------------------------------
 ------------------------------- KREIRAMO INSTANCU KLASE 'Cart' --------------------------------
 --------------------------------------------------------------------------------------*/
const shoppingCart = new Cart();


// Azuriramo status 'CHECKOUT' i 'Remove All' buttona u korpi po otvaranju stranice
const checkoutButton = document.getElementById('checkout-button');
const clearCartButton = document.getElementById('clear-cart-button');
update_checkout_removeAll_buttonsStatus();




// Simuliramo porudzbinu
checkoutButton.addEventListener('click', () => {
    if (JSON.parse(localStorage.getItem('loggedInUser'))) {
        placeOrder(document.querySelector('#loader'), checkoutButton, clearCartButton, token, shoppingCart, update_addToCartButtonsStatus, cartToggler);
    } else {
        alert('You must be logged in to place your order');
    }
});


// Praznimo korpu
clearCartButton.addEventListener('click', () => {
    emptyTheCart(shoppingCart, update_addToCartButtonsStatus);
});







/* Funkcija za omogucavanje ili onemogucavanje 'CHECKOUT' i 'Remove All' buttona
na osnovu stanja korpe */ 
function update_checkout_removeAll_buttonsStatus() {

    if (shoppingCart.isEmpty()) {
        checkoutButton.disabled = true;
        clearCartButton.disabled = true;
    } else {
        checkoutButton.disabled = false;
        clearCartButton.disabled = false;
    }

}




/* Funkcija za omogucavanje ili onemogucavanje pojedinacnog 'ADD TO CART' button-a
na osnovu toga da li je taj proizvod vec u korpi */
function update_addToCartButtonsStatus() {

    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    addToCartButtons.forEach(button => {

        const productID = button.getAttribute('data-product-id'); 
        button.disabled = isProductInCart(productID);
        
    });

}





// Funkcija za provjeravanje da li je proizvod dodat u korpu da bismo manipulisali stanjem 'ADD TO CART' buttona
function isProductInCart(productID) {

    /* Array.some() metoda prolazi kroz proizvode u korpi i u slucaju da u njoj postoji proizvod ciji se 'id'
       poklapa sa 'data-product-id'-jem odredjenog button-a, ona vraca boolean 'true' i postavlja vrijednost
       'disabled' atributa button-a na 'true' i obrnuto */
    
    return shoppingCart.items.some(item => item.id == productID);

}
















/* --------------------------------------------------------------------------------------
 ------------------------------- KREIRAMO INSTANCU KLASE 'User' --------------------------------
 --------------------------------------------------------------------------------------*/
const user = new User();


















/* ------------------------------------------------------- EXPORTS ------------------------------------------------------- */
export {
    update_checkout_removeAll_buttonsStatus,
    update_addToCartButtonsStatus,
    isProductInCart,
    shoppingCart,
    token
}