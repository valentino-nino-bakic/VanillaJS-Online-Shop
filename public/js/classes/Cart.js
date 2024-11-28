import BASE_URL from '../config/baseUrl.js';


class Cart {
    constructor() {
        /* singleton pattern along wiht static 'getInstance' method below 
            for consistency of 'Cart' state when creating 
                new instances across other modules..... */
        if (Cart.instance) {
            return Cart.instance;
        }
        Cart.instance = this;

        const savedItems = JSON.parse(localStorage.getItem('products'));
        this.items = savedItems ? savedItems : [];

        this.checkoutButton = document.getElementById('checkout-button');
        this.clearCartButton = document.getElementById('clear-cart-button');

        this.cartIcon = document.querySelector('.cart-icon');
        this.closeButton = document.querySelector('.x');
        this.cartToggler = document.querySelector('.cart-toggler-wrapper');

        this.updateCartBadge();
        this.update_addToCartButtonsStatus();
        this.update_checkout_removeAll_buttonsStatus();
        this.update_productPage_addToCartButtons();
        this.addClickListeners();
    }


    static getInstance() {
        if (!Cart.instance) {
            Cart.instance = new Cart();
        }
        return Cart.instance;
    }



    // Ordering products
    async checkout() {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            this.cartToggler.style.display = 'none';
            document.querySelector('.register-form-wrapper').style.display = 'flex';
            document.body.classList.add('disable-scroll');
            document.documentElement.classList.add('disable-scroll');
            return;
        }

        try {
            document.querySelector('#loader').style.display = 'flex';
            document.querySelector('#checkout-button').disabled = true;
            document.querySelector('#clear-cart-button').disabled = true;

            const requestBody = this.items.map(element => {
                return {
                    productId: element.product._id,
                    quantity: element.quantity
                };
            });

            const response = await fetch(`${BASE_URL}/api/carts`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}` // jwt from local storage
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();

            setTimeout(() => {
                alert(data.message);
                console.log(data.message);
                this.clearCart();
                this.resetTotalPrice();
                this.update_addToCartButtonsStatus();
                this.update_productPage_addToCartButtons();
                document.querySelector('#loader').style.display = 'none';
                document.querySelector('.cart-toggler-wrapper').style.display = 'none';
                document.body.classList.remove('disable-scroll');
                document.documentElement.classList.remove('disable-scroll');
            }, 5000);



        } catch (error) {
            alert(error);
            console.log(error);
        }
    }




    // Add item to cart
    addItem(product, quantity) {
        this.items.push({ product, quantity });
        localStorage.setItem('products', JSON.stringify(this.items));
        this.updateCartBadge();
        this.displayItems();
    }


    // Remove item from cart
    removeItem(productID) {
        // Array.findIndex() metoda pronalazi odredjeni proizvod ciji se 'data-product-key' poklapa sa 'data-product-key'-jem kliknutog button-a
        const indexToRemove = this.items.findIndex(item => item.product._id === productID);

        if (indexToRemove !== -1) {
            this.items.splice(indexToRemove, 1); // Uklanjamo proizvod iz niza na odredjenom indeksu
            localStorage.setItem('products', JSON.stringify(this.items)); // Azuriramo local storage
            this.displayItems(); // Azuriramo prikaz korpe nakon uklanjanja proizvoda
            this.updateCartBadge(); // Azuriramo brojac korpe

            // Uklanjanjem zadnjeg preostalog proizvoda resetujemo cijenu na '$0.00'
            if (this.items.length === 0) {
                this.resetTotalPrice();
            }
        }
    }



    // Displaying added items
    displayItems() {
        const cartItemsList = document.getElementById('cart-items');
        const cartSummary = document.getElementById('cart-summary');
        cartItemsList.innerHTML = '';

        let totalPrice = 0; // Varijabla koja prati ukupnu cijenu. Na pocetku je inicijalizujemo na '$0.00'

        if (this.items.length === 0) {
            // Kada je korpa prazna, prikazujemo tekst 'Your cart is empty'
            const emptyCartMessage = document.createElement('h3');
            emptyCartMessage.textContent = 'Your cart is empty';
            cartItemsList.appendChild(emptyCartMessage);
        } else {
            // Kreiramo html strukturu za svaki dodati proizvod pojedinacno
            this.items.forEach(element => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${element.product.productImageUrl}">
                    <p>${element.product.productTitle}</p>
                    <p>$${element.quantity * element.product.productPrice}</p>
                    <div>
                        <button class="remove-from-cart-button" data-product-id="${element.product._id}">
                            <i class="fa-solid fa-trash" title="Remove from cart"></i>
                        </button>
                    </div>
                `;
                cartItemsList.appendChild(listItem);

                // Dodajemo cijenu dodatog proizvoda na ukupnu cijenu
                totalPrice += element.product.productPrice * element.quantity;

                // Prikazujemo ukupnu cijenu u korpi
                const totalElement = cartSummary.querySelector('h3');
                totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

                // Dodajemo event listenere za svaki pojedinacni 'fa-trash' button za uklanjanje tog proizvoda iz korpe
                const removeButton = listItem.querySelector('.remove-from-cart-button');
                if (removeButton) {
                    const productIDToRemove = removeButton.getAttribute('data-product-id');
                    removeButton.addEventListener('click', () => {
                        this.removeItem(productIDToRemove);
                        this.update_checkout_removeAll_buttonsStatus();
                        this.update_addToCartButtonsStatus();
                    });
                }
            });
        }
    }




    // keeps track of number of items added
    updateCartBadge() {
        const cartBadge = document.querySelector('.badge');
        cartBadge.style.animation = '';
        let numberOfAddedItems = 0;
        this.items.forEach(element => {
            numberOfAddedItems += element.quantity;
        });
        cartBadge.textContent = numberOfAddedItems;
        setTimeout(() => {
            cartBadge.style.animation = 'badgeMove .5s';
        }, 0);
    }


    // updating cart after CHECKOUT or after removing all products from cart
    clearCart() {
        this.items = [];
        localStorage.setItem('products', JSON.stringify(this.items));
        this.displayItems();
        this.updateCartBadge();
        this.update_checkout_removeAll_buttonsStatus();
    }


    // update total price after CHECKOUT or after removing all items from cart
    resetTotalPrice() {
        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = 'Total: $0.00';
    }


    // updating 'CHECKOUT' and 'Remove All' buttons' 'disabled' attribute.
    isEmpty() {
        return this.items.length === 0;
    }




    update_checkout_removeAll_buttonsStatus() {
        if (this.isEmpty()) {
            this.checkoutButton.disabled = true;
            this.clearCartButton.disabled = true;
        } else {
            this.checkoutButton.disabled = false;
            this.clearCartButton.disabled = false;
        }
    }




    update_addToCartButtonsStatus() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-button');
        addToCartButtons.forEach(button => {
            const productID = button.getAttribute('data-product-id');
            button.disabled = this.isProductInCart(productID);
        });
    }


    update_productPage_addToCartButtons() {
        const productPageAddToCartButtons = document.querySelectorAll('.product-page-add-to-cart-button');
        productPageAddToCartButtons.forEach(button => {
            if (button) {
                const productId = button.getAttribute('data-product-id');
                button.disabled = this.isProductInCart(productId);
            }
        })
    }




    isProductInCart(productID) {
        return this.items.some(item => item.product._id === productID);
    }





    addClickListeners() {
        this.checkoutButton.addEventListener('click', () => {
            this.checkout();
        });

        this.clearCartButton.addEventListener('click', () => {
            this.clearCart();
            this.resetTotalPrice();
            this.update_addToCartButtonsStatus();
        });


        /* ---------------------- OTVARANJE I ZATVARANJE KORPE - 3 sledece metode -------------------*/
        // cart icon hides cart.
        this.cartIcon.addEventListener('click', () => {
            this.cartToggler.style.display = 'block';
            this.cartToggler.style.animation = 'cartShow .5s ease-out'
            document.body.classList.add('disable-scroll');
            document.documentElement.classList.add('disable-scroll');
            this.displayItems(); // updating added items
        });

        // 'X' hides cart.
        this.closeButton.addEventListener('click', () => {
            this.cartToggler.style.display = 'none';
            document.body.classList.remove('disable-scroll');
            document.documentElement.classList.remove('disable-scroll');
        });

        // overlay hides cart.
        this.cartToggler.addEventListener('click', e => {
            if (e.target === this.cartToggler) {
                this.cartToggler.style.display = 'none';
                document.body.classList.remove('disable-scroll');
                document.documentElement.classList.remove('disable-scroll');
            }
        });





        const productPage_addToCartButton = document.querySelectorAll('.product-page-add-to-cart-button');
        productPage_addToCartButton.forEach(button => {
            if (button) {
                button.addEventListener('click', async e => {
                    const productID = e.target.getAttribute('data-product-id');

                    try {
                        const response = await fetch(`${BASE_URL}/api/products`);
                        if (!response.ok) {
                            const data = await response.json();
                            throw new Error(data.message);
                        }

                        const data = await response.json();
                        const products = data.products;
                        const selectedProduct = products.find(product => product._id == productID);
                        
                        const quantity = parseInt(e.target.parentElement.querySelector('.product-page-quantity').value);
                        
                        this.addItem(selectedProduct, quantity);
                        this.update_checkout_removeAll_buttonsStatus();
                        this.update_addToCartButtonsStatus();
                        this.update_productPage_addToCartButtons();
                    } catch (error) {
                        console.log(error);
                    }
                });
            }
        });




        const productPage_quantityInputs = document.querySelectorAll('.product-page-quantity');
        productPage_quantityInputs.forEach(quantityInput => {
            if (quantityInput) {
                quantityInput.addEventListener('input', e => {
                    const max = parseInt(e.target.getAttribute('max'));
                    if (parseInt(e.target.value) > max) {
                        e.target.value = max;
                    }
                })
            }
        })
    }




}








export default Cart;
