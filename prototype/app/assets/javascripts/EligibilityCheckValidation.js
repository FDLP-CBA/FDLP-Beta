(() => {
  const form = document.querySelector('#address-form, #vehicle-form')
  if (!form) return

  const summary = form.querySelector('[data-error-summary]')
  const errorList = summary.querySelector('[data-error-list]')
  
  const requiredInputs = form.querySelectorAll('input[aria-required="true"]')

  form.addEventListener('submit', (event) => {
    
    errorList.replaceChildren()

    for (const input of requiredInputs) {
      
      const value = input.value.trim()
      const hasError = value === '' ||
        (input.id === 'vehicle-registration' && validateNumberPlate(value) === false)

      
      const error = document.getElementById(`${input.id}-error`)
      
      const descriptions = new Set(
        (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean)
      )

      error.hidden = !hasError
      input.classList.toggle('govuk-input--error', hasError)
      input.closest('.govuk-form-group').classList.toggle('govuk-form-group--error', hasError)

      if (hasError) {
        input.setAttribute('aria-invalid', 'true')
        descriptions.add(error.id)

        
        const link = document.createElement('a')
        link.href = `#${input.id}`
        link.textContent = error.querySelector('[data-error-text]').textContent.trim()

        const item = document.createElement('li')
        item.append(link)
        errorList.append(item)
      } else {
        input.removeAttribute('aria-invalid')
        descriptions.delete(error.id)
      }

      if (descriptions.size) {
        input.setAttribute('aria-describedby', [...descriptions].join(' '))
      } else {
        input.removeAttribute('aria-describedby')
      }
    }

    const hasErrors = errorList.childElementCount > 0
    summary.hidden = !hasErrors

    if (hasErrors) {
      
      event.preventDefault()
      summary.focus()
    }
  })

  // Number plate validation: return false for an invalid plate.
  // Does not work with private registrations 
  function validateNumberPlate(value) {

    const plate = value.toUpperCase().replace(/\s+/g, '')
    return /^[A-Z]{2}[0-9]{2}[A-Z]{3}$/.test(plate) 
    
  }


})()
