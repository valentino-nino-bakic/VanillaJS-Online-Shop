/* ------------- ANIMIRAMO HEADER --------- */
gsap.to(document.querySelector('#logo'), { x: 0, duration: 1, ease: 'power2.out' });
gsap.to(document.querySelector('nav'), { x: 0, duration: 1, ease: 'power2.out' });
gsap.to(document.querySelector('.cart-icon'), { y: 0, duration: 1, ease: 'power2.out'});
gsap.to(document.querySelector('#hamburger-menu-icon'), { y: 0, duration: 1, ease: 'power2.out'});







/* --------------- ANIMIRAMO PODNASLOV GLAVNE STRANICE -------------- */
const pForAnimation = document.getElementById('p-for-animation');

// Pomocu Array.split() metode pravimo array ciji su elementi svaki pojedinacni karakter i pravimo animaciju za svaki od njih
const letters = pForAnimation.textContent.split('');
pForAnimation.textContent = '';


// Array.forEach() metoda iterira kroz svaki element(karakter) i sprema ih za animaciju 
letters.forEach((letter, index) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.opacity = 0;
    pForAnimation.appendChild(span);

    // Konacno ih animiramo
    gsap.to(span, {
        opacity: 1, // Postepeno povecavanje transparentnosti
        duration: 0.5, // Trajanje animacije pojedinacnog slova(karaktera)
        delay: 0.03 * index, // Delay za svako slovo(karakter)
    });
});








/* ANIMIRAMO STRELICU U NASLOVU GLAVNE STRANICE */
const animatingArrow = document.getElementById('animate-arrow');

gsap.set(animatingArrow, { y: +window.innerHeight, opacity: 0 });

gsap.to(animatingArrow, {
    duration: 1,
    y: 0, 
    opacity: 1,
    ease: 'power2.out',
    delay: .7
});









/* ---------------------- WHAT DO WE DO SEKCIJA ----------------------- */
const whatWeDoSection = document.querySelector('.what-we-do-section')
gsap.to(whatWeDoSection, {
    y: 0,
    opacity: 1,
    duration: 1.4,
    ease: 'power2',
    scrollTrigger: whatWeDoSection
});










 /* ---------------------- PRODUCTS SEKCIJA ----------------------- */

    /* Animirano u 'fetch_display_data.js' fajlu */












  /* ---------------------- CUSTOMER REVIEWS SEKCIJA ----------------------- */
const customersWrapper = document.querySelector('.customers-wrapper');
const customersAnimation = gsap.fromTo(
    customersWrapper.children,
    {
        x: '100%',
        opacity: 0
    },
    {
        x: 0,
        opacity: 1,
        duration: 3,
        stagger: .4,
        ease: 'power2',
        paused: true
    }
);

ScrollTrigger.create({
    trigger: customersWrapper.children,
    start: "top bottom",
    end: "bottom top",
    animation: customersAnimation,
    toggleActions: "play none none none",
});















  
  