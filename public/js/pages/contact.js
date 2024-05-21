const userToken = localStorage.getItem('user_token');

window.addEventListener('scroll', headerToggler);

function headerToggler() {

    if (window.scrollY > document.querySelector('header').getBoundingClientRect().top) {
        document.querySelector('header').classList.add('toggle-main-header')
    } else {
        document.querySelector('header').classList.remove('toggle-main-header');
    }

}
////////////////////////////////////////////////////////////////////////////////////////





/* --------------------- HAMBURGER MENU --------------------- */
const hamburgerMenuIcon = document.querySelector('#hamburger-menu-icon');
const nav = document.querySelector('#navbar');

let isOpen = false;

hamburgerMenuIcon.addEventListener('click', () => {

    if (!isOpen) {
      gsap.to(nav, { top: '100%', opacity: 1, duration: .8, ease: Power4.easeOut });
      isOpen = true;
      document.querySelector('header').style.background = 'rgba(0, 0, 0, 0.9)';
    } else {
      gsap.to(nav, { top: '-100vh', opacity: 0, duration: .3, ease: 'power2.inOut' });
      isOpen = false;
      document.querySelector('header').style.backgroundColor = ''
    }

});
/////////////////////////////////////////////////////////////////////////////////////////











/*------------------------------------------------      VALIDACIJA FORME      ----------------------------------------------------*/
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const formButton = document.getElementById('form-btn');


/* 3 varijable sa kojima manipulisemo u input listenerima cije ce vrijednosti biti od
kljucnog znacaja prilikom podnosenja forme */
let isNameValid = false;
let isEmailValid = false;
let isMessageValid = false;



// Validiramo ime
nameInput.addEventListener('input', e => {
    
    if (e.target.value.length > 2 && e.target.value.length < 20) {
        if (e.target.value.trim() !== '') {
            isNameValid = true;
            e.target.style.borderColor = 'silver'
        }
    } else {
        e.target.style.borderColor = 'red'
        isNameValid = false
    }

});



// Validiramo email adresu
emailInput.addEventListener('input', e => {

    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (regex.test(e.target.value)) {
        isEmailValid = true;
        e.target.style.borderColor = 'silver'
    } else {
        isEmailValid = false;
        e.target.style.borderColor = 'red'
    }

});



// Validiramo poruku
messageInput.addEventListener('input', e => {

    if (messageInput.value.trim() !== '' && messageInput.value.trim().length >= 10) {
        isMessageValid = true;
        e.target.style.borderColor = 'silver';
    } else {
        isMessageValid = false;
        e.target.style.borderColor = 'red';
    }

});





// Funkcija za podnosenje forme 
function submitMessage(e) {
    e.preventDefault();

    // Simuliramo server sa 'jsonplaceholder'-om
    const url = 'https://jsonplaceholder.typicode.com/posts';

    if (isNameValid && isEmailValid && isMessageValid) {
        const body = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify(body)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`An error occured ${response.status}`)
                }
                return response.json();
            })
            .then(data => {
                setTimeout(() => {
                    alert('Your message has been successfully sent');
                    console.log('Message successfully sent!');
                    nameInput.value = '';
                    emailInput.value = '';
                    document.querySelector('#subject').value = '';
                    messageInput.value = '';
        
                    isNameValid = false;
                    isEmailValid = false;
                    isMessageValid = false;
                }, 500)
            })
            .catch(error => {
                alert('Failed sending your message');
                console.error(`Error sending the message \n ${error}`);
            })
    } else {
        alert('Please fill out all required fields');
    }
}



// Procesuiranje forme
formButton.addEventListener('click', submitMessage);