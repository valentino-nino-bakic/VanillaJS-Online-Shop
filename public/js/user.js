

/* KREIRAMO KLASU ZA LOGIN I REGISTRACIJU KORISNIKA */
class User {

    constructor() {
        this.usernameOrEmail = document.querySelector('#username_or_email')
        this.password = document.querySelector('#password');
        this.newUsername = document.querySelector('#new-username');
        this.newEmail = document.querySelector('#new-email');
        this.newPassword = document.querySelector('#new-password');
        this.isLoggedIn();
    }







    async register() {
        try {
            const requestBody = {
                username: this.newUsername.value,
                email: this.newEmail.value,
                password: this.newPassword.value,
            }
            const apiUrl = 'http://localhost:<PORT_NUMBER>/api/signup';

            if (this.validateOnSignUp()) {
                const response = await fetch(apiUrl, {
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
                document.querySelector('.register-form-wrapper').style.display = 'none';
                document.querySelector('.login-form-wrapper').style.display = 'flex';
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }









    async login() {
        try {
            const requestBody = {
                usernameOrEmail: this.usernameOrEmail.value,
                password: this.password.value,
            }
            const apiUrl = 'http://localhost:<PORT_NUMBER>/api/login';

            if (this.validateOnLogin()) {
                const response = await fetch(apiUrl, {
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
                localStorage.setItem('token', JSON.stringify(data.token));
                alert(data.message);
                location.reload();
            } else {
                alert('Failed to log in');
            }
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }






    logout() {
        localStorage.removeItem('token');
        location.reload();
    }








    async deleteAccount(password) {
        try {
            const token = JSON.parse(localStorage.getItem('token'));
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.id;
            const apiUrl = `http://localhost:<PORT_NUMBER>/api/delete/${userId}`;

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
            const apiUrl = `http://localhost:<PORT_NUMBER>/api/modify/${userId}`;

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
            location.reload();
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }







    validateOnSignUp() {
        if (this.newUsername.value.trim().length < 3 || this.newUsername.value.trim().length > 15) {
            return false;
        }
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.newEmail.value)) {
            return false;
        }
        if (this.newPassword.value.trim().length < 8) {
            return false;
        }
        return true;
    }







    validateOnLogin() {
        if (this.usernameOrEmail.value.trim().length < 3) {
            alert('username or email field must have at least 3 characters')
            return false;
        }
        if (this.password.value.trim().length < 8) {
            alert('password must have at least 8 characters')
            return false;
        }
        return true;
    }









    /*
    OVA METODA PO OTVARANJU STRANICE AZURIRA SADRZAJ ZACELJA NASE STRANICE NA OSVNOVU STANJA LOCAL STORAGE-A
    (ako je korisnik prijavljen onda prikazujemo 'Log Oout' dugme a ako nije prijavljen prikazujemo 'Log In' i 'Sign Up' dugmad....)
    TAKODJE SE U NJOJ NALAZE EVENT LISTENERI KOJI IZVRSAVAJU LOGIKU DRUGIH METODA IZ OVE KLASE .....
    */
    isLoggedIn() {
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            document.querySelector('.login-register').style.display = 'block';
            document.querySelector('.user-account-actions-container').style.display = 'none';
            const signUpBtn = document.querySelector('#register-form button');
            signUpBtn.addEventListener('click', e => {
                e.preventDefault();
                this.register();
            })
            const logInBtn = document.querySelector('#login-form button');
            logInBtn.addEventListener('click', e => {
                e.preventDefault();
                this.login();
            })
            document.querySelector('.login-button').addEventListener('click', () => {
                document.querySelector('.login-form-wrapper').style.display = 'flex';
                document.body.classList.add('disable-scroll');
                document.documentElement.classList.add('disable-scroll');
            })
            document.querySelector('.register-button').addEventListener('click', () => {
                document.querySelector('.register-form-wrapper').style.display = 'flex';
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
        } else {
            document.querySelector('.login-register').style.display = 'none';
            document.querySelector('.user-account-actions-container').style.display = 'block';

            const decodedToken = jwt_decode(token);
            const loggedInUserUsername = document.createElement('p');
            loggedInUserUsername.textContent = decodedToken.username;
            document.querySelector('#user-account-actions-toggler').appendChild(loggedInUserUsername);

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
    }





}







export default User;
