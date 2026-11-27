const nameForm = document.getElementById('NameForm')
const numberForm = document.getElementById('NumberForm')
const photoForm = document.getElementById('photoForm')

if(nameForm){
    const nameInput = document.getElementById('nameEntry')
    const nameError = document.getElementById('name-error')

    nameForm.addEventListener('submit', event =>{
        event.preventDefault()

        const isBlank = nameInput.value.trim() === ''
        nameError.hidden = !isBlank

        if (isBlank){
            return 
        }

        window.location.href = '/Application/enterNumber.html'  

    })
}


if (numberForm){
    const numberInput = document.getElementById('numberEntry')
    const numberError = document.getElementById('number-error')

    numberInput.addEventListener('input', () => {
        numberError.hidden = numberInput.value.trim() != ""
    })

    numberForm.addEventListener('submit', event =>{
        event.preventDefault()
        
        const isBlank = numberInput.value.trim() === ''
        numberError.hidden = !isBlank

        if (isBlank){
            return
        }

        window.location.href = '/Application/uploadPhotos.html'
    })
}


if (photoForm){

    const photo = document.getElementById('photo-upload-1')
    const error = document.getElementById('photo-error')

    photo.addEventListener('change', () => {
        error.hidden = photo.files.length > 0
    })

    photoForm.addEventListener('submit', event => {
        event.preventDefault()

        const isBlank = photo.files.length === 0
        error.hidden = !isBlank

        if (isBlank){
            return
        }

        window.location.href ='/Application/applicationSummary.html'
    })


}