


class Admin {
    constructor() {
        this.addClickListeners();
    }



    async addNewUser(e) {
        e.preventDefault();
        const requestBody = {
            username: document.querySelector('#admin-created-user-username').value,
            email: document.querySelector('#admin-created-user-email').value,
            password: document.querySelector('#admin-created-user-password').value,
        }
        try {
            const response = await fetch('http://localhost:8080/api/admin/users/add-new-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            const data = await response.json();
            alert(data.message);
            location.reload();
        } catch (error) {
            console.log(error);
        }
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

        document.querySelector('#add-new-user-form').addEventListener('submit', this.addNewUser.bind(this));


        document.querySelector('#user-account-actions-toggler').addEventListener('click', () => {
            let userAccountActionsDiv = document.querySelector('.user-account-actions');
            if (userAccountActionsDiv.style.display === 'flex') {
                userAccountActionsDiv.style.display = 'none';
            } else {
                userAccountActionsDiv.style.display = 'flex';
            }
        });



        document.querySelector('.add-new-user-button').addEventListener('click', () => {
            document.querySelector('.add-new-user-form-wrapper').style.display = 'flex';
            document.body.classList.add('disable-scroll');
            document.documentElement.classList.add('disable-scroll');
        })


        document.querySelectorAll('.close-form-button').forEach(button => {
            button.addEventListener('click', e => {
                e.target.parentElement.parentElement.style.display = 'none';
                document.body.classList.remove('disable-scroll');
                document.documentElement.classList.remove('disable-scroll');
            });
        });
    }
}





export default Admin;
