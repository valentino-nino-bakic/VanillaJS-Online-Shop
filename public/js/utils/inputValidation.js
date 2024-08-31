const errorValidationMessages = {
    'username_or_email': 'This field requires minimum 4 and maximum 15 characters',
    'password': 'This field requires minimum 7 and maximum 25 characters',
    'new-username': 'This field requires minimum 4 and maximum 15 characters',
    'new-email': 'Invalid email address',
    'new-password': 'This field requires minimum 7 and maximum 25 characters',

    'new-modified-username': 'This field requires minimum 4 and maximum 15 characters',
    'new-modified-password': 'This field requires minimum 7 and maximum 25 characters',
    'current-user-password': 'This field requires minimum 7 and maximum 25 characters',
    'confirm-account-deletion-password': 'This field requires minimum 7 and maximum 25 characters',

    'final-error-message': 'Please fill out all required fields'
}



function showErrorMessage(element) {
    const elementId = element.getAttribute('id');
    const parentElement = element.parentElement;
    const errorMessage = errorValidationMessages[elementId];
    let errorMessageElement = parentElement.querySelector('.error-message');
    
    if (!errorMessageElement) {
        errorMessageElement = document.createElement('p');
        errorMessageElement.className = 'error-message';
        errorMessageElement.textContent = errorMessage;
        parentElement.appendChild(errorMessageElement);
    }
}



function hideErrorMessage(element) {
    const errorMessageElement = element.parentElement.querySelector('.error-message');
    if (errorMessageElement) {
        element.parentElement.removeChild(errorMessageElement);
    }
}






function showFinalErrorMessage(element) {
    const errorMessage = errorValidationMessages['final-error-message'];
    let errorMessageElement = element.querySelector('.error-message');

    if (!errorMessageElement) {
        errorMessageElement = document.createElement('p');
        errorMessageElement.className = 'error-message';
        errorMessageElement.textContent = errorMessage;
        element.appendChild(errorMessageElement);
    }
}




export { showErrorMessage, hideErrorMessage, showFinalErrorMessage }
