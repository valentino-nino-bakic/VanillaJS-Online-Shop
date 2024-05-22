import { errorValidationMessages, showErrorMessage, hideErrorMessage } from "../modules/inputValidation.js";


/* KREIRAMO KLASU ZA LOGIN I REGISTRACIJU KORISNIKA */
class Login_Register {

    constructor(usernameOrEmail, password, newUsername, newEmail, newPassword) {
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
        this.newUsername = newUsername;
        this.newEmail = newEmail;
        this.newPassword = newPassword;
        this.addClickListeners();
        this.addInputValidationListeners();
    }







    async register() {
        try {
            const requestBody = {
                username: this.newUsername.value,
                email: this.newEmail.value,
                password: this.newPassword.value,
            }
            const apiUrl = 'http://localhost:<PORT>/api/signup';

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
            const apiUrl = 'http://localhost:<PORT>/api/login';

            if (!this.validateOnLogin()) {
                throw new Error('failed to log in.');
            }    
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
            location.href = '/profile';
            
        } catch (error) {
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
        if (this.newPassword.value.trim().length < 7 || this.newPassword.value.trim().length > 25) {
            return false;
        }
        return true;
    }







    validateOnLogin() {
        if (this.usernameOrEmail.value.trim().length < 4 || this.usernameOrEmail.value.trim().length > 15) {
            alert('This field requires minimum 4 and maximum 15 characters')
            return false;
        }
        if (this.password.value.trim().length < 7 || this.newPassword.value.trim().length > 25) {
            alert('This field requires minimum 7 and maximum 25 characters')
            return false;
        }
        return true;
    }







    addClickListeners() {
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
    }



    addInputValidationListeners() {
        this.usernameOrEmail.addEventListener('input', e => {
            if (this.usernameOrEmail.value.trim().length < 4 || this.usernameOrEmail.value.trim().length > 15) {
                showErrorMessage(this.usernameOrEmail);
            } else {
                hideErrorMessage(this.usernameOrEmail);
            }
        });
    
        this.password.addEventListener('input', e => {
            if (e.target.value.trim().length < 7 || e.target.value.trim().length > 25) {
                showErrorMessage(this.password);
            } else {
                hideErrorMessage(this.password);
            }
        });

        this.newUsername.addEventListener('input', e => {
            if (e.target.value.trim().length < 4 || e.target.value.trim().length > 15) {
                showErrorMessage(this.newUsername);
            } else {
                hideErrorMessage(this.newUsername);
            }
        });

        this.newEmail.addEventListener('input', e => {
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
                showErrorMessage(this.newEmail);
            } else {
                hideErrorMessage(this.newEmail);
            }
        });

        this.newPassword.addEventListener('input', e => {
            if (e.target.value.trim().length < 7 || e.target.value.trim().length > 25) {
                showErrorMessage(this.newPassword);
            } else {
                hideErrorMessage(this.newPassword);
            }
        });
    }

}






export default Login_Register;
