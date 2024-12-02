/* ------------------------------------------------------- IMPORTS ------------------------------------------------------- */
import Cart from './Cart.js';
const shoppingCart = Cart.getInstance();




// Product handling class - fetching, displaying, filtering, sorting...
class Product {
    constructor() {
        this.products = [];
        this.filteredProducts = [];

        this.productsPerPage = 4;
        this.currentPage = 1;

        this.sortOption = '';
        this.selectedCategory = '';

        this.addChangeListeners();
        this.addClickListeners();
    }



    // fetching products - initial display...
    async fetchProducts() {
        try {
            const response = await fetch(`/api/products`);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            const data = await response.json();
            this.products = data.products;
            this.filterAndSort();
            this.displayProducts();
        } catch (error) {
            console.log(error);
        }
    }



    // products sorting and filtering.
    filterAndSort() {
        this.filteredProducts = this.selectedCategory
            ? this.products.filter(product => product.productCategory === this.selectedCategory)
            : this.products;

        switch (this.sortOption) {
            case 'a-z':
                this.filteredProducts.sort((a, b) => a.productTitle.localeCompare(b.productTitle));
                break;
            case 'z-a':
                this.filteredProducts.sort((a, b) => b.productTitle.localeCompare(a.productTitle));
                break;
            case 'price-asc':
                this.filteredProducts.sort((a, b) => a.productPrice - b.productPrice);
                break;
            case 'price-desc':
                this.filteredProducts.sort((a, b) => b.productPrice - a.productPrice);
                break;
        }

        this.currentPage = 1;
    }


    // we call this method after creating class instance to ensure proper product fetching first..
    addProductSearchListener() {
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');

        searchInput.addEventListener('input', e => {
            const query = e.target.value.toLowerCase();
            if (query.length > 0) {
                const matchedProducts = this.products.filter(product => product.productTitle.toLowerCase().includes(query));
                this.showProductSearchResults(matchedProducts);
            } else {
                searchResults.innerHTML = '';
                searchResults.classList.add('product-list-hidden');
            }
        });
    }


    // updating UI
    showProductSearchResults(matchedProducts) {
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = '';

        if (matchedProducts.length === 0) {
            searchResults.classList.add('product-list-hidden');
            return;
        }

        matchedProducts.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                <img src="${product.productImageUrl}" alt="${product.productTitle}">
                <h4>${product.productTitle.length > 50 ? product.productTitle = product.productTitle.substring(0, 50).concat('...') : product.productTitle}</h4>
                <h5>$${product.productPrice}</h5>
            `;
            li.addEventListener('click', () => {
                location.href = `/product/${product._id}`;
            });
            searchResults.appendChild(li);
        });

        searchResults.classList.remove('product-list-hidden');
    }



    // displaying products
    displayProducts() {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        const firstIndex = (this.currentPage - 1) * this.productsPerPage;
        const secondIndex = firstIndex + this.productsPerPage;
        const productsToDisplay = this.filteredProducts.slice(firstIndex, secondIndex);

        for (let product of productsToDisplay) {
            const productHTML = `
                <div class="single-product">
                    <img src="${product.productImageUrl}" alt="${product.productTitle}">
                    <h4>${product.productTitle.length > 50 ? product.productTitle = product.productTitle.substring(0, 50).concat('...') : product.productTitle}</h4>
                    <p>${product.productDescription.length > 140 ? product.productDescription = product.productDescription.substring(0, 140).concat('...') : product.productDescription}</p>
                    <h5>$${product.productPrice}</h5>
                    <div class="actions">
                        <input class="quantity" type="number" value="1" min="1" max="${product.inStock}" required />
                        <button class="add-to-cart-button" data-product-id="${product._id}" ${shoppingCart.isProductInCart(product._id) ? 'disabled' : ''}>ADD TO CART</button>
                    </div>
                </div>
            `
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
                        start: 'top bottom',
                        end: 'bottom top'
                    }
                }
            );

            // 'Event delegation' technique.
            productContainer.querySelectorAll('.single-product').forEach(p => {
                p.addEventListener('click', e => {
                    if (e.target && e.target.matches('.add-to-cart-button')) {
                        const productID = e.target.getAttribute('data-product-id');
                        const selectedProduct = this.products.find(product => product._id == productID);
                        const quantity = parseInt(e.target.parentElement.querySelector('.quantity').value);
                        shoppingCart.addItem(selectedProduct, quantity);
                        shoppingCart.update_checkout_removeAll_buttonsStatus();
                        shoppingCart.update_addToCartButtonsStatus();
                    }
                });
            });

            // 'Event delegation' technique.
            productContainer.addEventListener('input', e => {
                if (e.target && e.target.matches('.quantity')) {
                    const max = parseInt(e.target.getAttribute('max'));
                    if (parseInt(e.target.value) > max) {
                        e.target.value = max;
                    }
                }
            });
        }

        const numOfAllPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        document.querySelector('#current-page').textContent = this.currentPage + ' / ' + numOfAllPages;
        this.updatePaginationButtons();
    }



    updatePaginationButtons() {
        const numberOfAllPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        document.querySelector('#prev-page-button').disabled = this.currentPage === 1;
        document.querySelector('#next-page-button').disabled = this.currentPage === numberOfAllPages;
    }



    selectSortOption(sortOption) {
        this.sortOption = sortOption;
        this.filterAndSort();
        this.displayProducts();
    }

    selectCategory(category) {
        this.selectedCategory = category;
        this.filterAndSort();
        this.displayProducts();
    }

    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.displayProducts();
        }
    }

    goToNextPage() {
        if (this.currentPage < Math.ceil(this.filteredProducts.length / this.productsPerPage)) {
            this.currentPage++;
            this.displayProducts();
        }
    }


    addChangeListeners() {
        document.getElementById('sort-options').addEventListener('change', e => {
            this.selectSortOption(e.target.value);
        });

        document.getElementById('category-select').addEventListener('change', e => {
            this.selectCategory(e.target.value);
        });
    }


    addClickListeners() {
        document.getElementById('prev-page-button').addEventListener('click', () => {
            this.goToPreviousPage();
        });

        document.getElementById('next-page-button').addEventListener('click', () => {
            this.goToNextPage();
        });
    }


}





export default Product;
