


class Admin {
    constructor() {
        this.addClickListeners();
    }



    async replyToMessageViaEmail(e) {
        e.preventDefault();
        const requestBody = {
            messageId: e.target.querySelector('input').value,
            emailReplyMessage: e.target.querySelector('textarea').value
        }
        try {
            const response = await fetch('http://localhost:8080/api/admin/messages/email-reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            })
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            const data = await response.json();
            alert(data.message);
        } catch (error) {
            console.log(error);
        }
    }



    logout() {
        localStorage.removeItem('token');
        location.href = '/';
    }



    addClickListeners() {
        document.querySelectorAll('.email-reply-message-form').forEach(form => {
            form.addEventListener('submit', this.replyToMessageViaEmail.bind(this));
        })


        document.querySelector('#logout-button').addEventListener('click', e => {
            e.preventDefault();
            this.logout();
        });

        document.querySelector('#user-account-actions-toggler').addEventListener('click', () => {
            let userAccountActionsDiv = document.querySelector('.user-account-actions');
            if (userAccountActionsDiv.style.display === 'flex') {
                userAccountActionsDiv.style.display = 'none';
            } else {
                userAccountActionsDiv.style.display = 'flex';
            }
        });
    }
}





export default Admin;
