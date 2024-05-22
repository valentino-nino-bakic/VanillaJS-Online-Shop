/* Pomocne funkcije iz 'script.js' fajla */
import { update_checkout_removeAll_buttonsStatus, update_addToCartButtonsStatus } from '../pages/profile.js';




/* ------------------------------------------------------------------------
--------------- KREIRAMO KLASU 'Cart' KOJA PREDSTAVLJA KORPU --------------
------------------------------------------------------------------------ */

class Cart {
    constructor() {
        this.items = [];
    }


    // Metoda za dodavanje proizvoda u korpu
    addItem(product) {

        this.items.push(product);
        this.updateCartBadge();

    }


    // Metoda za uklanjanje proizvoda iz korpe na osnovu 'data-product-key'-ja
    removeItem(productID) {

        // Array.findIndex() metoda pronalazi odredjeni proizvod ciji se 'data-product-key' poklapa sa 'data-product-key'-jem kliknutog button-a
        const indexToRemove = this.items.findIndex(item => item._id == productID);

        if (indexToRemove !== -1) {
            this.items.splice(indexToRemove, 1); // Uklanjamo proizvod iz niza na odredjenom indeksu
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
            this.items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${item.productImageUrl}">
                    <p>${item.productTitle}</p>
                    <p>$${item.productPrice}</p>
                    <div>
                        <button class="remove-from-cart-button" data-product-id="${item._id}">
                            <i class="fa-solid fa-trash" title="Remove from cart"></i>
                        </button>
                    </div>
                `;
                cartItemsList.appendChild(listItem);

                // Dodajemo cijenu dodatog proizvoda na ukupnu cijenu
                totalPrice += item.productPrice;

                // Prikazujemo ukupnu cijenu u korpi
                const totalElement = cartSummary.querySelector('h3');
                totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;

                // Dodajemo event listenere za svaki pojedinacni 'fa-trash' button za uklanjanje tog proizvoda iz korpe
                const removeButton = listItem.querySelector('.remove-from-cart-button');
                if (removeButton) {
                    const productIDToRemove = removeButton.getAttribute('data-product-id');
                    removeButton.addEventListener('click', () => {

                        this.removeItem(productIDToRemove);

                        update_checkout_removeAll_buttonsStatus()
                        update_addToCartButtonsStatus()


                    });
                }
            });
        }

    }




    // Metoda za azuriranje brojaca proizvoda u korpi
    updateCartBadge() {
        const cartBadge = document.querySelector('.badge');
        cartBadge.style.animation = '';
        cartBadge.textContent = this.items.length;
        setTimeout(() => {
            cartBadge.style.animation = 'badgeMove .5s';
        }, 0);
    }


    // Metoda za azuriranje korpe nakon CHECKOUT-a ili uklanjanja svih proizvoda
    clearCart() {

        this.items = [];
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


}








export default Cart;