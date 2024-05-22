

/* KREIRAMO KLASU ZA ULOGOVANOG KORISNIKA */
class Profile {

    constructor() {
        this.addEventListeners();
        this.setLoggedInUserUsername();
        // this.addInputValidationListeners();
    }




    logout() {
        localStorage.removeItem('token');
        location.href = '/';
    }





    async deleteAccount(password) {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.id;
            const apiUrl = `http://localhost:<PORT>/api/delete/${userId}`;

            const response = await fetch(apiUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer: ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password: password.value })
            });
            const data = await response.json();
            if (!response.ok) {
                alert(data.message);
                return;
            }
            localStorage.removeItem('token');
            alert(data.message);
            location.reload();
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }






    async modifyAccount(newModifiedUsername, newModifiedPassword, currentUserPassword) {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.id;
            const apiUrl = `http://localhost:<PORT>/api/modify/${userId}`;

            const requestBody = {
                newUsername: newModifiedUsername,
                newPassword: newModifiedPassword,
                currentPassword: currentUserPassword
            }

            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer: ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            localStorage.setItem('token', JSON.stringify(data.token));
            alert(data.message);
            location.href = '/';
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }






    async addEventListeners() {
        document.querySelector('#user-account-actions-toggler').addEventListener('click', () => {
            let userAccountActionsDiv = document.querySelector('.user-account-actions');
            if (userAccountActionsDiv.style.display === 'none') {
                userAccountActionsDiv.style.display = 'flex';
            } else {
                userAccountActionsDiv.style.display = 'none';
            }
        });

        document.querySelector('.logout-button').addEventListener('click', e => {
            e.preventDefault();
            this.logout()
        });

        document.querySelector('.delete-button').addEventListener('click', e => {
            if (confirm('Are you sure you want to delete your account?\nIf so, there is no going back and all your orders will be cancelled if there are any')) {
                document.querySelector('.confirm-account-deletion-wrapper').style.display = 'flex';
                document.body.classList.add('disable-scroll');
                document.documentElement.classList.add('disable-scroll');

            }
        });
        document.querySelector('#confirm-account-deletion-form').addEventListener('submit', async e => {
            e.preventDefault();
            const password = document.querySelector('#confirm-account-deletion-password');
            this.deleteAccount(password);
        })

        document.querySelector('.modify-button').addEventListener('click', e => {
            document.querySelector('.modify-account-form-wrapper').style.display = 'flex';
            document.body.classList.add('disable-scroll');
            document.documentElement.classList.add('disable-scroll');
        });
        document.querySelector('#modify-account-form').addEventListener('submit', async e => {
            e.preventDefault();
            const newModifiedUsername = document.querySelector('#new-modified-username').value;
            const newModifiedPassword = document.querySelector('#new-modified-password').value;
            const currentUserPassword = document.querySelector('#current-user-password').value;
            this.modifyAccount(newModifiedUsername, newModifiedPassword, currentUserPassword);
        })

        document.querySelectorAll('.close-form-button').forEach(button => {
            button.addEventListener('click', e => {
                e.target.parentElement.parentElement.style.display = 'none';
                document.body.classList.remove('disable-scroll');
                document.documentElement.classList.remove('disable-scroll');
            });
        });
    }





    setLoggedInUserUsername() {
        const decoded = jwt_decode(JSON.parse(localStorage.getItem('token')));
        const username = decoded.username;
        document.querySelector('#user-account-actions-toggler p').innerHTML = username;
    }


}






export default Profile;
