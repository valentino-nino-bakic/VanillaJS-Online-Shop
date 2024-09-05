import { showErrorMessage, hideErrorMessage, showFinalErrorMessage } from "../utils/inputValidation.js";


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
            const apiUrl = 'http://localhost:8080/api/signup';

            if (!this.validateOnSignUp()) {
                showFinalErrorMessage(document.querySelector('.final-signup-error-message'));
                return;
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
            alert(data.message);
            document.querySelector('.register-form-wrapper').style.display = 'none';
            document.querySelector('.login-form-wrapper').style.display = 'flex';

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
            const apiUrl = 'http://localhost:8080/api/login';

            if (!this.validateOnLogin()) {
                showFinalErrorMessage(document.querySelector('.final-login-error-message'));
                return;
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
            const role = jwt_decode(data.token).role;

            if (role === 'admin') {
                localStorage.setItem('token', JSON.stringify(data.token));
                alert(data.message);
                location.href = '/admin';
            } else {
                localStorage.setItem('token', JSON.stringify(data.token));
                alert(data.message);
                location.href = '/profile';
            }
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
        if (this.newPassword.value.trim().length < 7 || this.newPassword.value.trim().length > 25) {
            return false;
        }
        return true;
    }







    validateOnLogin() {
        if (this.usernameOrEmail.value.trim().length < 4 || this.usernameOrEmail.value.trim().length > 15) {
            return false;
        }
        if (this.password.value.trim().length < 7 || this.newPassword.value.trim().length > 25) {
            return false;
        }
        return true;
    }







    addClickListeners() {
        const registerForm = document.querySelector('#register-form');
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            this.register();
        })
        const loginForm = document.querySelector('#login-form');
        loginForm.addEventListener('submit', e => {
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
        document.querySelector('#switch-to-register-form-toggler').addEventListener('click', e => {
            e.preventDefault();
            document.querySelector('.login-form-wrapper').style.display = 'none';
            document.querySelector('.register-form-wrapper').style.display = 'flex';
        });
        document.querySelector('#switch-to-login-form-toggler').addEventListener('click', e => {
            e.preventDefault();
            document.querySelector('.register-form-wrapper').style.display = 'none';
            document.querySelector('.login-form-wrapper').style.display = 'flex';
        });
    }



    addInputValidationListeners() {
        this.usernameOrEmail.addEventListener('input', e => {
            if (e.target.value.trim().length < 4 || e.target.value.trim().length > 15) {
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
