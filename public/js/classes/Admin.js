

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
            const response = await fetch(`/api/admin/users/add-new-user`, {
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



    async editUser(e) {
        e.preventDefault();
        const requestBody = {
            adminModifiedUserUsername: document.querySelector('#admin-modified-user-username').value,
            adminModifiedUserRole: document.querySelector('#admin-modified-user-role').value
        }
        const userId = e.target.querySelector('button').getAttribute('data-user-id');
        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: 'PUT',
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
            const response = await fetch(`/api/admin/messages/email-reply`, {
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




    async deleteUser(e) {
        const userId = e.target.getAttribute('data-user-id');
        try {
            if (confirm('Are you sure you want to delete this user account?')) {
                const response = await fetch(`/api/admin/users/${userId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message);
                }
                const data = await response.json();
                alert(data.message);
                location.reload();
            }
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


        const addNewUserForm = document.querySelector('#add-new-user-form');
        if (addNewUserForm) {
            addNewUserForm.addEventListener('submit', this.addNewUser.bind(this));
        }


        document.querySelector('#user-account-actions-toggler').addEventListener('click', () => {
            let userAccountActionsDiv = document.querySelector('.user-account-actions');
            if (userAccountActionsDiv.style.display === 'flex') {
                userAccountActionsDiv.style.display = 'none';
            } else {
                userAccountActionsDiv.style.display = 'flex';
            }
        });


        const addNewUserButton = document.querySelector('.add-new-user-button');
        if (addNewUserButton) {
            addNewUserButton.addEventListener('click', () => {
                document.querySelector('.add-new-user-form-wrapper').style.display = 'flex';
                document.body.classList.add('disable-scroll');
                document.documentElement.classList.add('disable-scroll');
            });
        }



        const editUserButton = document.querySelectorAll('.edit-user-button');
        editUserButton.forEach(button => {
            if (button) {
                button.addEventListener('click', e => {
                    const closestUsername = e.target.parentElement.parentElement.querySelector('.current-username').innerText;
                    const closestRole = e.target.parentElement.parentElement.querySelector('.current-role').innerText;
                    const closestId = e.target.parentElement.parentElement.querySelector('.current-id').innerText;
                    document.querySelector('#current-username').innerText = closestUsername;
                    document.querySelector('#current-role').innerText = closestRole;
                    document.querySelector('.edit-user-form-submit-button').setAttribute('data-user-id', closestId);
                    document.querySelector('.edit-user-form-wrapper').style.display = 'flex';
                    document.body.classList.add('disable-scroll');
                    document.documentElement.classList.add('disable-scroll');
                });
            }
        })


        document.querySelectorAll('.close-form-button').forEach(button => {
            button.addEventListener('click', e => {
                e.target.parentElement.parentElement.style.display = 'none';
                document.body.classList.remove('disable-scroll');
                document.documentElement.classList.remove('disable-scroll');
            });
        });




        document.querySelectorAll('.delete-user-button').forEach(button => {
            if (button) {
                button.addEventListener('click', this.deleteUser.bind(this));
            }
        });

        const editUserForm = document.querySelector('#edit-user-form');
            if (editUserForm) { 
                editUserForm.addEventListener('submit', this.editUser.bind(this));
            }
        }
}





export default Admin;
