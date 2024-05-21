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
