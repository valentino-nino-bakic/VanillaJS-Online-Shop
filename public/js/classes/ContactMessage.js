import { showErrorMessage, hideErrorMessage } from '../utils/inputValidation.js';
import BASE_URL from '../config/baseUrl.js';



class ContactMessage {
    constructor() {
        this.token = JSON.parse(localStorage.getItem('token')) || null;
        this.name_email_fieldsVisibility();
        this.contactMessageForm = document.querySelector('#contact-message-form');
        this.addClickListeners();
        this.addInputListeners();
    }

    async sendMessage(e) {
        e.preventDefault();

        const name = this.token ? '' : document.querySelector('#contact-name').value;
        const email = this.token ? this.getEmail() : document.querySelector('#contact-email').value;
        const subject = document.querySelector('#contact-message-subject').value;
        const message = document.querySelector('#contact-message').value;

        try {
            const requestBody = {
                name: name || '',
                email: email,
                subject: subject || '',
                message: message
            }

            if (!this.emailValid()) {
                return;
            }

            const response = await fetch(`${BASE_URL}/api/contact-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
            }, 500)
        } catch (error) {
            console.log(error);
        }
    }



    getEmail() {
        const decoded = jwt_decode(this.token);
        return decoded.email;
    }


    emailValid() {
        const email = document.querySelector('#contact-email');
        if (email.parentElement.style.display !== 'none') {
            const validity = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) ? false : true;
            return validity;
        }
        return true;
    }


    name_email_fieldsVisibility() {
        if (this.token) {
            const nameWrapper = document.querySelector('.name-wrapper');
            const emailWrapper = document.querySelector('.email-wrapper');
            nameWrapper.style.display = 'none';
            emailWrapper.style.display = 'none';
            emailWrapper.querySelector('#contact-email').removeAttribute('required');
        }
    }


    addClickListeners() {
        this.contactMessageForm.addEventListener('submit', this.sendMessage.bind(this));
    }


    addInputListeners() {
        const email = document.querySelector('#contact-email');
        email.addEventListener('input', e => {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
                showErrorMessage(email);
            } else {
                hideErrorMessage(email);
            }
        });
    }
}







export default ContactMessage;
