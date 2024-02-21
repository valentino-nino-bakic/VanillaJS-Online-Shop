import { token } from './script.js'




/* KREIRAMO KLASU ZA LOGIN I REGISTRACIJU KORISNIKA */
class User {

    constructor() {
        this.usernameOrEmail = document.querySelector('#username_or_email')
        this.password = document.querySelector('#password');
        this.newUsername = document.querySelector('#new-username');
        this.newEmail = document.querySelector('#new-email');
        this.newPassword = document.querySelector('#new-password');
        this.isInLocalStorage();
    }







    register() {
        let loggedInUser = {
            username: this.newUsername.value,
            email: this.newEmail.value,
            password: this.newPassword.value,
            token: token
        }
        if (this.validateOnSignUp()) {
            localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            localStorage.setItem('registeredUser', JSON.stringify(loggedInUser));
            document.querySelector('.register-form-wrapper').style.display = 'none';
            location.reload();
        } else {
            alert('Registration failed');
        }
    }



    


    
    

    login() {
        let registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
        if (!this.validateOnLogin()) {
            return false;
        }
        
        if (registeredUser) {
            if ((this.usernameOrEmail.value === registeredUser.username || this.usernameOrEmail.value === registeredUser.email) && this.password.value === registeredUser.password) {
                localStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
                location.reload();
                return true;
            }
        }
       
        alert('There is no such username or email and password in our database, try again');
        return false;
    }






    logout() {
        localStorage.removeItem('loggedInUser');
        location.reload();
    }








    deleteAccount() {
        localStorage.clear();
        location.reload();
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
    isInLocalStorage() {
        let loggedInUserData = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUserData) {
            document.querySelector('.login-register').style.display = 'block';
            document.querySelector('.logout-delete').style.display = 'none';
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
            document.querySelector('.logout-delete').style.display = 'block';
            document.querySelector('.logout-button').addEventListener('click', e => {
                e.preventDefault();
                this.logout()
            })
            document.querySelector('.delete-button').addEventListener('click', e => {
                e.preventDefault();
                if (confirm(`Are you sure you want to delete your account?
If so, there is no going back and all your orders will be cancelled if there are any`)) {
                    let password = loggedInUserData.password;
                    if (prompt('One last step - enter your password') === password) {
                        this.deleteAccount()
                    } else {
                        alert('Incorrect password');
                        return
                    }
                }
            })
        }
    }





}







export default User;