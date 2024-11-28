import { showErrorMessage, hideErrorMessage, showFinalErrorMessage } from "../utils/inputValidation.js";
import BASE_URL from '../config/baseUrl.js';

/* KREIRAMO KLASU ZA ULOGOVANOG KORISNIKA */
class Profile {

    constructor(newModifiedUsername, newModifiedPassword, currentUserPassword, confirmAccountDeletionPassword) {
        this.newModifiedUsername = newModifiedUsername;
        this.newModifiedPassword = newModifiedPassword;
        this.currentUserPassword = currentUserPassword;
        this.confirmAccountDeletionPassword = confirmAccountDeletionPassword;
        this.addClickListeners();
        this.addInputValidationListeners();
        this.setLoggedInUserUsername();
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

            if (!this.validateOnAccountDeletion()) {
                showFinalErrorMessage(document.querySelector('.final-account-deletion-error-message'));
                return;
            }

            const response = await fetch(`${BASE_URL}/api/delete/${userId}`, {
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

            const requestBody = {
                newUsername: newModifiedUsername,
                newPassword: newModifiedPassword,
                currentPassword: currentUserPassword
            }

            if (!this.validateOnAccountModification()) {
                showFinalErrorMessage(document.querySelector('.final-account-modification-error-message'));
                return;
            }

            const response = await fetch(`${BASE_URL}/api/modify/${userId}`, {
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

            localStorage.removeItem('token');
            alert(data.message);
            location.href = '/';
        } catch (error) {
            alert(error);
            console.log(error);
        }
    }





    validateOnAccountModification() {
        if (this.newModifiedUsername.value.trim().length < 4 || this.newModifiedUsername.value.trim().length > 15) {
            return false;
        }
        if (this.newModifiedPassword.value.trim().length < 7 || this.newModifiedPassword.value.trim().length > 25) {
            return false;
        }
        if (this.currentUserPassword.value.trim().length < 7 || this.currentUserPassword.value.trim().length > 25) {
            return false;
        }
        return true;
    }




    validateOnAccountDeletion() {
        if (this.confirmAccountDeletionPassword.value.trim().length < 7 || this.confirmAccountDeletionPassword.value.trim().length > 25) {
            return false;
        }
        return true;
    }





    addClickListeners() {
        document.querySelector('#modify-account-form').addEventListener('submit', e => {
            e.preventDefault();
            this.modifyAccount(this.newModifiedUsername.value, this.newModifiedPassword.value, this.currentUserPassword.value);
        })
        document.querySelector('#confirm-account-deletion-form').addEventListener('submit', e => {
            e.preventDefault();
            this.deleteAccount(this.confirmAccountDeletionPassword);
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
        document.querySelector('.delete-button').addEventListener('click', e => {
            if (confirm('Are you sure you want to delete your account?\nIf so, there is no going back and all your orders will be cancelled if there are any')) {
                document.querySelector('.confirm-account-deletion-wrapper').style.display = 'flex';
                document.body.classList.add('disable-scroll');
                document.documentElement.classList.add('disable-scroll');

            }
        });
        document.querySelector('.modify-button').addEventListener('click', e => {
            document.querySelector('.modify-account-form-wrapper').style.display = 'flex';
            document.body.classList.add('disable-scroll');
            document.documentElement.classList.add('disable-scroll');
        });
        document.querySelectorAll('.close-form-button').forEach(button => {
            button.addEventListener('click', e => {
                e.target.parentElement.parentElement.style.display = 'none';
                document.body.classList.remove('disable-scroll');
                document.documentElement.classList.remove('disable-scroll');
            });
        });
    }





    addInputValidationListeners() {
        this.newModifiedUsername.addEventListener('input', e => {
            if (e.target.value.trim().length < 4 || e.target.value.trim().length > 15) {
                showErrorMessage(this.newModifiedUsername);
            } else {
                hideErrorMessage(this.newModifiedUsername);
            }
        });

        this.newModifiedPassword.addEventListener('input', e => {
            if (e.target.value.trim().length < 7 || e.target.value.trim().length > 25) {
                showErrorMessage(this.newModifiedPassword);
            } else {
                hideErrorMessage(this.newModifiedPassword);
            }
        });

        this.currentUserPassword.addEventListener('input', e => {
            if (e.target.value.trim().length < 7 || e.target.value.trim().length > 25) {
                showErrorMessage(this.currentUserPassword);
            } else {
                hideErrorMessage(this.currentUserPassword);
            }
        });

        this.confirmAccountDeletionPassword.addEventListener('input', e => {
            if (e.target.value.trim().length < 7 || e.target.value.trim().length > 25) {
                showErrorMessage(this.confirmAccountDeletionPassword);
            } else {
                hideErrorMessage(this.confirmAccountDeletionPassword);
            }
        });
    }





    setLoggedInUserUsername() {
        const decoded = jwt_decode(JSON.parse(localStorage.getItem('token')));
        const username = decoded.username;
        document.querySelector('#user-account-actions-toggler p').textContent = username;
    }


}






export default Profile;
