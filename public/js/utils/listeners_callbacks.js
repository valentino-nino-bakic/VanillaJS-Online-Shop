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






/* ------------------------------------------------------- EXPORTS ------------------------------------------------------- */
export {
    headerToggler,
    backToTopButtonToggler,
    scrollToTop,
    scrollToProductSection,
    scrollToWhatWeDoSection,
    scrollToCustomerReviewsSection,
    toggleHamburgerMenu,
}
