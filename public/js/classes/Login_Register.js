

/* KREIRAMO KLASU ZA LOGIN I REGISTRACIJU KORISNIKA */
class Login_Register {

    constructor() {
        this.usernameOrEmail = document.querySelector('#username_or_email')
        this.password = document.querySelector('#password');
        this.newUsername = document.querySelector('#new-username');
        this.newEmail = document.querySelector('#new-email');
        this.newPassword = document.querySelector('#new-password');

        this.addEventListeners();
        // this.addInputValidationListeners(); // NAPRAVI OVU METODU!!!!!!!!!!!!
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







    addEventListeners() {
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





}







export default Login_Register;
