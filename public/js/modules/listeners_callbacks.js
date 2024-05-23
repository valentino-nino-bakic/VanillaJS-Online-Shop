/* ---------------- STICKY HEADER  -------------- */
function headerToggler() {
    if (window.scrollY > document.querySelector('header').getBoundingClientRect().top) {
        document.querySelector('header').classList.add('toggle-main-header')
    } else {
        document.querySelector('header').classList.remove('toggle-main-header');
    }
}




// Back to top button vidljivost
function backToTopButtonToggler() {

    if (window.scrollY > window.innerHeight / 2) {
        document.querySelector('.scroll-to-top-button').style.display = 'block';
    } else {
        document.querySelector('.scroll-to-top-button').style.display = 'none';
    }

}




/* -------------- NAZAD NA VRH STRANICE --------------- */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}




// Prikaz korpe klikom na cart ikonicu
function showCart(cartToggler, shoppingCart) {
    cartToggler.style.display = 'block';
    cartToggler.style.animation = 'cartShow .5s ease-out'
    document.body.classList.add('disable-scroll');
    document.documentElement.classList.add('disable-scroll');
    shoppingCart.displayItems(); // Prikazujemo proizvode iz korpe
}




// Zatvaranje korpe klikom na 'X'
function xHidesCart(cartToggler) {
    cartToggler.style.display = 'none';
    document.body.classList.remove('disable-scroll');
    document.documentElement.classList.remove('disable-scroll');
}




// Zatvaranje korpe klikom na 'X'
function overlayHidesCart(cartToggler) {
    cartToggler.style.display = 'none';
    document.body.classList.remove('disable-scroll');
    document.documentElement.classList.remove('disable-scroll');
}








/* ------------------------------------------------------            SMOOTH SCROLL LISTENERI              ---------------------------------------------------- */
/* -------------------- Smooth scroll sa vrha do 'PRODUCTS' sekcije -------------------- */
function scrollToProductSection(productSection) {
    const scrollTarget = productSection.offsetTop / 1.1;
    window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
    });
}


/* --------------------- Smooth scroll do 'WHAT WE DO' sekcije --------------------- */
function scrollToWhatWeDoSection(whatWeDoSection) {
    const scrollTarget = whatWeDoSection.offsetTop / 1.1;
    window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
    });
}


function scrollToCustomerReviewsSection(customerReviewsSection) {
    const scrollTarget = customerReviewsSection.offsetTop / 1.03;
    window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
    });
}




// Hamburger menu
let isOpen = false; // Globalna varijabla cijom vrijednoscu manipulisemo da bi pravilno otvarali i zatvarali navbar

function toggleHamburgerMenu(nav, header) {
    if (!isOpen) {
        gsap.to(nav, { top: '100%', opacity: 1, duration: .8, ease: Power4.easeOut });
        isOpen = true;
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
        gsap.to(nav, { top: '-100vh', opacity: 0, duration: .3, ease: 'power2.inOut' });
        isOpen = false;
        header.style.backgroundColor = ''
    }
}





// Event listener na 'select' elementu za prikazivanje proizvoda iz izabrane kategorije
function switchCategory(selectElement, updateProducts, update_addToCartButtonsStatus) {
    const selectedCategory = selectElement.value;
    updateProducts(selectedCategory);
    update_addToCartButtonsStatus();
}





// Praznimo korpu
function emptyTheCart(shoppingCart, update_addToCartButtonsStatus) {
    shoppingCart.clearCart();
    shoppingCart.resetTotalPrice();
    update_addToCartButtonsStatus();    
}















/* ------------------------------------------------------- EXPORTS ------------------------------------------------------- */
export {
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
    emptyTheCart
}
