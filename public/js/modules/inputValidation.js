const errorValidationMessages = {
    'username_or_email': 'This field requires minimum 4 and maximum 15 characters',
    'password': 'This field requires minimum 7 and maximum 25 characters',
    'new-username': 'This field requires minimum 4 and maximum 15 characters',
    'new-email': 'Invalid email address',
    'new-password': 'This field requires minimum 7 and maximum 25 characters'
}



function showErrorMessage(element) {
    const elementId = element.getAttribute('id');
    let parentElement = element.parentElement;
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



export { errorValidationMessages, showErrorMessage, hideErrorMessage }
