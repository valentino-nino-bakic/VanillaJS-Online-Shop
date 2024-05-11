/* ------------------------------------------------------- IMPORTS ------------------------------------------------------- */
import { 
    isProductInCart,
    shoppingCart,
    update_checkout_removeAll_buttonsStatus,
    update_addToCartButtonsStatus 
} from './script.js';



/*----------------------------------------      AZURIRANJE STRANICE SA PODACIMA O PROIZVODIMA SA 'FAKE STORE API'-JA      --------------------------------------------*/
// Funkcija za dohvatanje proizvoda sa 'fake store api'-ja
async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    throw new Error('Error fetching products from Fake Store API');
}




// Funkcija za prikazivanje proizvoda
async function updateProducts(category) {

    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = '';

    try {

        const products = await fetchProducts();
        for (let product of products) {
            if (product.category === category) {
                const productHTML = `

                    <div class="single-product">
                        <img src="${product.image}" alt="${product.title}">
                        <h4>${product.title.length > 50 ? product.title = product.title.substring(0, 50).concat('...') : product.title}</h4>
                        <p>${product.description.length > 140 ? product.description = product.description.substring(0, 140).concat('...') : product.description}</p>
                        <h5>$${product.price}</h5>
                        <button class="add-to-cart-button" data-product-id="${product.id}" ${isProductInCart(product.id) ? 'disabled' : ''}>ADD TO CART</button>
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


                // Event listeneri za dodavanje svakog pojedinacnog proizvoda u korpu
                const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', e => {

                        const productID = e.target.getAttribute('data-product-id');
                        const selectedProduct = products.find(product => product.id == productID);

                        shoppingCart.addItem(selectedProduct);

                        update_checkout_removeAll_buttonsStatus()
                        update_addToCartButtonsStatus();

                    });
                });
            }
        }

    } catch (error) {
        console.error(`Error loading products: ${error}`);
    }

}






export default updateProducts;