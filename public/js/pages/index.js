// Redirection
if (localStorage.getItem('token') && location.pathname === '/') {
    location.href = 'profile';
}








// Shared functionalities with 'profile.js' page.
import Login_Register from '../classes/Login_Register.js';
import { backToTopButtonToggler, headerToggler, scrollToTop, scrollToProductSection, scrollToCustomerReviewsSection, scrollToWhatWeDoSection } from '../modules/listeners_callbacks.js';





window.addEventListener('DOMContentLoaded', () => {
    const usernameOrEmail = document.querySelector('#username_or_email');
    const password = document.querySelector('#password');
    const newUsername = document.querySelector('#new-username');
    const newEmail = document.querySelector('#new-email');
    const newPassword = document.querySelector('#new-password');
    const login_register = new Login_Register(usernameOrEmail, password, newUsername, newEmail, newPassword);
})





window.addEventListener('scroll', () => {
    backToTopButtonToggler();
    headerToggler();
});

document.querySelector('.scroll-to-top-button').addEventListener('click', scrollToTop);

document.querySelector('#animate-arrow').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});

document.querySelector('#fa-products-section-trigger').addEventListener('click', () => {
    scrollToProductSection(document.querySelector('.products-section'));
});

document.querySelector('#fa-customer-products-section-trigger').addEventListener('click', () => {
    scrollToCustomerReviewsSection(document.querySelector('.customer-reviews-section'));
});

document.querySelector('#learn-more-button').addEventListener('click', () => {
    scrollToWhatWeDoSection(document.querySelector('.what-we-do-section'));
});


/* ---------------------- OTVARANJE I ZATVARANJE KORPE -------------------*/
const cartIcon = document.querySelector('.cart-icon');
const closeButton = document.querySelector('.x');
const cartToggler = document.querySelector('.cart-toggler-wrapper');

// Prikaz korpe klikom na cart ikonicu
cartIcon.addEventListener('click', () => {
    cartToggler.style.display = 'block';
    cartToggler.style.animation = 'cartShow .5s ease-out'
    document.body.classList.add('disable-scroll');
    document.documentElement.classList.add('disable-scroll');
});

// Zatvaranje korpe klikom na 'X'
closeButton.addEventListener('click', () => {
    cartToggler.style.display = 'none';
    document.body.classList.remove('disable-scroll');
    document.documentElement.classList.remove('disable-scroll');
});

// Zatvaranje korpe klikom na overlay
cartToggler.addEventListener('click', e => {
    if (e.target === cartToggler) {
        cartToggler.style.display = 'none';
        document.body.classList.remove('disable-scroll');
        document.documentElement.classList.remove('disable-scroll');
    }
});


const cartEmpty_loginFormTogglerButton = document.querySelector('#cart-empty-login-form-toggler-button');
cartEmpty_loginFormTogglerButton.addEventListener('click', e => {
    cartToggler.style.display = 'none';
    document.querySelector('.login-form-wrapper').style.display = 'flex';
})

const cartEmpty_RegisterFormTogglerButton = document.querySelector('#cart-empty-register-form-toggler-button');
cartEmpty_RegisterFormTogglerButton.addEventListener('click', e => {
    cartToggler.style.display = 'none';
    document.querySelector('.register-form-wrapper').style.display = 'flex';
})





// Prikazivanje skrivenih login i register formi
document.querySelector('.login-button').addEventListener('click', () => {
    document.querySelector('.login-form-wrapper').style.display = 'flex';
    document.body.classList.add('disable-scroll');
    document.documentElement.classList.add('disable-scroll');
})
document.querySelector('.register-button').addEventListener('click', () => {
    document.querySelector('.register-form-wrapper').style.display = 'flex';
    document.body.classList.add('disable-scroll');
    document.documentElement.classList.add('disable-scroll');
})


// Mijenjanje formi
document.querySelector('#switch-to-register-form-toggler').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.login-form-wrapper').style.display = 'none';
    document.querySelector('.register-form-wrapper').style.display = 'flex';
});
document.querySelector('#switch-to-login-form-toggler').addEventListener('click', e => {
    e.preventDefault();
    document.querySelector('.register-form-wrapper').style.display = 'none';
    document.querySelector('.login-form-wrapper').style.display = 'flex';
});









/*----------------------------------------      AZURIRANJE STRANICE SA PODACIMA O PROIZVODIMA IZ NASE BAZE PODATAKA      --------------------------------------------*/
// Funkcija za dohvatanje proizvoda
async function fetchProducts() {
    const response = await fetch('http://localhost:<PORT>/api/products');
    if (response.ok) {
        const data = await response.json();
        return data.products;
    }
    throw new Error('Error fetching products from our server');
}




// Funkcija za prikazivanje proizvoda
async function updateProducts(category) {

    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    try {

        const products = await fetchProducts();
        for (let product of products) {
            if (product.productCategory === category && product.inStock > 0) {
                const productHTML = `

                    <div class="single-product">
                        <img src="${product.productImageUrl}" alt="${product.productTitle}">
                        <h4>${product.productTitle.length > 50 ? product.productTitle = product.productTitle.substring(0, 50).concat('...') : product.productTitle}</h4>
                        <p>${product.productDescription.length > 140 ? product.productDescription = product.productDescription.substring(0, 140).concat('...') : product.productDescription}</p>
                        <h5>$${product.productPrice}</h5>
                        <button class="add-to-cart-button">ADD TO CART</button>
                    </div>

                `;
                productContainer.innerHTML += productHTML;

                gsap.fromTo(
                    productContainer.children,
                    {
                        rotationY: 270,
                    },
                    {
                        rotationY: 360,
                        duration: 1.6,
                        ease: 'bounce',
                        scrollTrigger: {
                            trigger: productContainer,
                            start: "top bottom",
                            end: "bottom top"
                        }
                    }
                );
                const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        document.querySelector('.register-form-wrapper').style.display = 'flex';
                        document.body.classList.add('disable-scroll');
                        document.documentElement.classList.add('disable-scroll');
                    });
                });
                document.querySelectorAll('.close-form-button').forEach(button => {
                    button.addEventListener('click', e => {
                        e.target.parentElement.parentElement.style.display = 'none';
                        document.body.classList.remove('disable-scroll');
                        document.documentElement.classList.remove('disable-scroll');
                    });
                });
            }
        }
    } catch (error) {
        console.error(`Error loading products: ${error}`);
    }
}
// Event listener na 'select' elementu za prikazivanje proizvoda iz izabrane kategorije
const categorySelect = document.getElementById('category-select');
categorySelect.addEventListener('change', () => {
    const selectedCategory = categorySelect.value;
    updateProducts(selectedCategory);
});

// Po otvaranju stranice inicijalno prikazujemo proizvode iz kategorije 'Retro Football Jerseys'.
updateProducts('Retro Football Jerseys');
////////////////////////////////////////////////////////////////////////////////////////
