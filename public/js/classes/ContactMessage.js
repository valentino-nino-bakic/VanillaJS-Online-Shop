class ContactMessage {
    constructor() {
        this.token = JSON.parse(localStorage.getItem('token')) || null;
        this.contactMessageForm = document.querySelector('#contact-message-form');
        this.addClickListeners();
    }

    async sendMessage(e) {
        e.preventDefault();

        const name = document.querySelector('#name').value;
        const email = this.token ? this.getEmail() : document.querySelector('#email').value;
        const subject = document.querySelector('#subject').value;
        const message = document.querySelector('#message').value;

        try {
            const url = 'http://localhost:8080/api/contact-message';
            const requestBody = {
                name: name || '',
                email: email,
                subject: subject || '',
                message: message
            }

            const response = await fetch(url, {
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



    addClickListeners() {
        this.contactMessageForm.addEventListener('submit', this.sendMessage.bind(this));
    }
}







export default ContactMessage;
