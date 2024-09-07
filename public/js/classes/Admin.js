


class Admin {
    constructor() {
        this.addClickListeners();
    }



    logout() {
        localStorage.removeItem('token');
        location.href = '/';
    }



    addClickListeners() {
        // document.querySelector('#modify-account-form').addEventListener('submit', e => {
        //     e.preventDefault();
        //     this.modifyAccount(this.newModifiedUsername.value, this.newModifiedPassword.value, this.currentUserPassword.value);
        // })
        // document.querySelector('#confirm-account-deletion-form').addEventListener('submit', e => {
        //     e.preventDefault();
        //     this.deleteAccount(this.confirmAccountDeletionPassword);
        // })
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
        // document.querySelector('.delete-button').addEventListener('click', e => {
        //     if (confirm('Are you sure you want to delete your account?\nIf so, there is no going back and all your orders will be cancelled if there are any')) {
        //         document.querySelector('.confirm-account-deletion-wrapper').style.display = 'flex';
        //         document.body.classList.add('disable-scroll');
        //         document.documentElement.classList.add('disable-scroll');

        //     }
        // });
        // document.querySelector('.modify-button').addEventListener('click', e => {
        //     document.querySelector('.modify-account-form-wrapper').style.display = 'flex';
        //     document.body.classList.add('disable-scroll');
        //     document.documentElement.classList.add('disable-scroll');
        // });
        // document.querySelectorAll('.close-form-button').forEach(button => {
        //     button.addEventListener('click', e => {
        //         e.target.parentElement.parentElement.style.display = 'none';
        //         document.body.classList.remove('disable-scroll');
        //         document.documentElement.classList.remove('disable-scroll');
        //     });
        // });
    }
}





export default Admin;
