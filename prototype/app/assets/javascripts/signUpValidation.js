const signUpForm = document.getElementById('signUpForm')
const email = document.getElementById('EmailAddressEntry')
const password = document.getElementById('PasswordEntry')

const emailError = document.getElementById('email-error')
const emailFormatError = document.getElementById('email-format-error')
const passwordError = document.getElementById('password-error')
const passwordMismatchError = document.getElementById('password-mismatch-error')
const repeatPassword = document.getElementById('RepeatPasswordEntry')
const repeatPasswordError = document.getElementById('repeat-password-error')


signUpForm.addEventListener('submit', (event) =>{

  event.preventDefault()


  const emailValue = email.value.trim()
  const emailIsBlank = emailValue ===''
  const emailIsMissingAt = !emailIsBlank && !emailValue.includes('@')
  const passwordIsBlank = password.value ===''
  const repeatPasswordIsBlank = repeatPassword.value === ''
  const passwordsDoNotMatch = !passwordIsBlank && !repeatPasswordIsBlank && password.value != repeatPassword.value


  const hasErrors = emailIsBlank || emailIsMissingAt || passwordIsBlank || repeatPasswordIsBlank || passwordsDoNotMatch

  emailError.hidden = !emailIsBlank
  emailFormatError.hidden = !emailIsMissingAt
  passwordError.hidden = !passwordIsBlank
  repeatPasswordError.hidden = !repeatPasswordIsBlank
  passwordMismatchError.hidden = !passwordsDoNotMatch


  if (!hasErrors){
    localStorage.setItem('demoEmail', emailValue)
    window.location.href='/Application/enterName.html'
  }




});