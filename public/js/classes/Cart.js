/* ------------------------------------------------------------------------
--------------- KREIRAMO KLASU 'Cart' KOJA PREDSTAVLJA KORPU --------------
------------------------------------------------------------------------ */

class Cart {
    constructor() {
        const savedItems = JSON.parse(localStorage.getItem('products'));
        this.items = savedItems ? savedItems : [];

        this.checkoutButton = document.getElementById('checkout-button');
        this.clearCartButton = document.getElementById('clear-cart-button');

        this.updateCartBadge();
        this.update_addToCartButtonsStatus();
        this.update_checkout_removeAll_buttonsStatus();
    }


    // Porucujemo proizvode
    async checkout() {
        try {
            const token = await JSON.parse(localStorage.getItem('token'));
            document.querySelector('#loader').style.display = 'flex';
            document.querySelector('#checkout-button').disabled = true;
            document.querySelector('#clear-cart-button').disabled = true;

            const requestBody = this.items.map(element => {
                return {
                    productId: element.product._id,
                    quantity: element.quantity
                };
            });

            const response = await fetch('http://localhost:8080/api/carts', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}` // jwt iz local storage-a
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
                update_addToCartButtonsStatus();
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




    // Metoda za dodavanje proizvoda u korpu
    addItem(product, quantity) {
        this.items.push({ product, quantity });
        localStorage.setItem('products', JSON.stringify(this.items));
        this.updateCartBadge();
        this.displayItems();
    }


    // Metoda za uklanjanje proizvoda iz korpe na osnovu 'data-product-key'-ja
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



    // Metoda za prikazivanje proizvoda u korpi
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
                        update_checkout_removeAll_buttonsStatus();
                        update_addToCartButtonsStatus();
                    });
                }
            });
        }
    }




    // Metoda za azuriranje brojaca proizvoda u korpi
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


    // Metoda za azuriranje korpe nakon CHECKOUT-a ili uklanjanja svih proizvoda
    clearCart() {
        this.items = [];
        localStorage.setItem('products', JSON.stringify(this.items));
        this.displayItems();
        this.updateCartBadge();
        update_checkout_removeAll_buttonsStatus();
    }


    // Metoda za azuriranje prikaza ukupne cijene
    resetTotalPrice() {
        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = 'Total: $0.00';
    }


    // Metoda za disable-ovanje 'CHECKOUT' i 'Remove All' buttona kada je korpa prazna
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
    }




}








export default Cart;
