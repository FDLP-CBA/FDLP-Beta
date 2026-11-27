import { accounts } from "./Accounts.js";

const loginForm = document.getElementById('signInForm');
const email = document.getElementById('EmailAddressEntry');
const password = document.getElementById('PasswordEntry');

const emailError = document.getElementById('email-error')
const passError = document.getElementById('password-error')

const errorAlert = document.getElementById('sign-in-error-alert')



loginForm.addEventListener('submit', function(event) {

    event.preventDefault()


    const emailIsBlank =  email.value === ''
    const passIsBlank = password.value === ''

    emailError.hidden = !emailIsBlank
    passError.hidden = !passIsBlank

    
    const account = accounts.find(account => 
        account.email.toLowerCase() === email.value.trim().toLowerCase() &&
        account.password === password.value)

    if (account){
        localStorage.setItem('demoEmail', account.email)

    }else{
        errorAlert.hidden = false

    }

    


});
