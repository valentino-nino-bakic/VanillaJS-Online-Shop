/* ------------- ANIMIRAMO HEADER --------- */
gsap.to(document.querySelector('#logo'), { x: 0, duration: 1, ease: 'power2.out' });
gsap.to(document.querySelector('nav'), { x: 0, duration: 1, ease: 'power2.out' });
gsap.to(document.querySelector('#hamburger-menu-icon'), { y: 0, duration: 1, ease: 'power2.out'});
    
    
    
    



/* ------------------ ANIMIRAMO PODNASLOV I PARAGRAF ------------------- */
const heading = document.querySelector('.about-us-wrapper h2');
const paragraphsWrapper = document.querySelector('.about-us-wrapper .paragraphs-wrapper'); // Selektujemo roditeljski div


const headingAnimation = gsap.from(heading, {
    y: -100,
    opacity: 0,
    duration: .8,
    onComplete: () => {
        paragraphsWrapperAnimation.play();
    }
});

const paragraphsWrapperAnimation = gsap.from(paragraphsWrapper, {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: .5
});


window.addEventListener('load', () => {
    
    headingAnimation.play();

});







