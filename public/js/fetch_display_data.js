/* ------------------------------------------------------- IMPORTS ------------------------------------------------------- */
import { 
    isProductInCart,
    shoppingCart,
    update_checkout_removeAll_buttonsStatus,
    update_addToCartButtonsStatus 
} from './script.js';



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
            if (product.productCategory === category) {
                const productHTML = `

                    <div class="single-product">
                        <img src="${product.productImageUrl}" alt="${product.productTitle}">
                        <h4>${product.productTitle.length > 50 ? product.productTitle = product.productTitle.substring(0, 50).concat('...') : product.productTitle}</h4>
                        <p>${product.productDescription.length > 140 ? product.productDescription = product.productDescription.substring(0, 140).concat('...') : product.productDescription}</p>
                        <h5>$${product.productPrice}</h5>
                        <button class="add-to-cart-button" data-product-id="${product._id}" ${isProductInCart(product._id) ? 'disabled' : ''}>ADD TO CART</button>
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
                        const selectedProduct = products.find(product => product._id == productID);

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
