/* ------------------------------------------------------- IMPORTS ------------------------------------------------------- */
import {
    shoppingCart,
} from '../pages/profile.js';



/*----------------------------------------      AZURIRANJE STRANICE SA PODACIMA O PROIZVODIMA IZ NASE BAZE PODATAKA      --------------------------------------------*/
class Product {
    constructor() {
        this.selectElement = document.querySelector('#category-select');
        this.addChangeListeners();
    }



    // Funkcija za dohvatanje proizvoda
    async fetchProducts() {
        const response = await fetch('http://localhost:8080/api/products');
        if (response.ok) {
            const data = await response.json();
            return data.products;
        }
        throw new Error('Error fetching products from our server');
    }



    // Funkcija za sortiranje proizvoda.
    sortProducts(products, sortOrder) {
        switch (sortOrder) {
            case 'name-asc':
                return products.sort((a, b) => a.productTitle.localeCompare(b.productTitle));
            case 'name-desc':
                return products.sort((a, b) => b.productTitle.localeCompare(a.productTitle));
            case 'price-asc':
                return products.sort((a, b) => a.productPrice - b.productPrice);
            case 'price-desc':
                return products.sort((a, b) => b.productPrice - a.productPrice);
            default:
                return products;
        }
    }



    // Funkcija za prikazivanje proizvoda
    async updateProducts(category) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';


        try {
            let products = await this.fetchProducts();
            products = products.filter(product => product.productCategory === category && product.inStock > 0);

            const selectedSortOption = document.querySelector('input[name="sort-option"]:checked')?.value;
            if (selectedSortOption) {
                products = sortProducts(products, selectedSortOption);
            }

            for (let product of products) {
                const productHTML = document.createElement('div');
                productHTML.classList.add('single-product');
                productHTML.innerHTML = `
                    <img src="${product.productImageUrl}" alt="${product.productTitle}">
                    <h4>${product.productTitle.length > 50 ? product.productTitle = product.productTitle.substring(0, 50).concat('...') : product.productTitle}</h4>
                    <p>${product.productDescription.length > 140 ? product.productDescription = product.productDescription.substring(0, 140).concat('...') : product.productDescription}</p>
                    <h5>$${product.productPrice}</h5>
                    <div class="actions">
                        <input class="quantity" type="number" value="1" min="1" max="${product.inStock}" required />
                        <button class="add-to-cart-button" data-product-id="${product._id}" ${shoppingCart.isProductInCart(product._id) ? 'disabled' : ''}>ADD TO CART</button>
                    </div>
                `;

                productContainer.appendChild(productHTML);

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
                            start: 'top bottom',
                            end: 'bottom top'
                        }
                    }
                );
            }

            // 'Event delegation' tehnika na 'productContainer'-u u odnosu na dugmad za dodavanje svakog pojedinacnog proizvoda u korpu.
            productContainer.addEventListener('click', e => {
                if (e.target && e.target.matches('.add-to-cart-button')) {
                    const productID = e.target.getAttribute('data-product-id');
                    const selectedProduct = products.find(product => product._id == productID);
                    const quantity = parseInt(e.target.parentElement.querySelector('.quantity').value);
                    shoppingCart.addItem(selectedProduct, quantity);
                    shoppingCart.update_checkout_removeAll_buttonsStatus();
                    shoppingCart.update_addToCartButtonsStatus();
                }
            });

            // 'Event delegation' tehnika na 'productContainer'-u u odnosu na input polja za restrikciju unosa kolicine vise nego sto je na zalihama.
            productContainer.addEventListener('input', e => {
                if (e.target && e.target.matches('.quantity')) {
                    const max = parseInt(e.target.getAttribute('max'));
                    if (parseInt(e.target.value) > max) {
                        e.target.value = max;
                    }
                }
            });



        } catch (error) {
            console.error(`Error loading products: ${error}`);
        }
    }


    // Event listener na 'select' elementu za prikazivanje proizvoda iz izabrane kategorije
    switchCategory() {
        const selectedCategory = this.selectElement.value;
        this.updateProducts(selectedCategory);
        shoppingCart.update_addToCartButtonsStatus();
    }


    addChangeListeners() {
        this.selectElement.addEventListener('change', () => {
            this.switchCategory();
        })
    }


}





export default Product;
