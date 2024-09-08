


class Admin {
    constructor() {
        this.addClickListeners();
    }



    logout() {
        localStorage.removeItem('token');
        location.href = '/';
    }



    addClickListeners() {
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
