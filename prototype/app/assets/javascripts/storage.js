const STORAGE_KEY = 'GrantApplication'


function getApplication(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}

}

function saveApplication(application){
    localStorage.setItem('GrantApplication', JSON.stringify(application))
}

// Looks at the current page and saves the visible fields 
function saveField(){
    const application = getApplication()

    const fields = {
        name: '#nameEntry',
        phone: '#numberEntry',
        addressLine1: '#address-line-1',
        addressLine2: '#address-line-2',
        town: '#address-town',
        county: '#address-county',
        postcode: '#address-postcode',
        registration: '#vehicle-registration'
    }

    for (const [key, selector] of Object.entries(fields)){
        const input = document.querySelector(selector)

        if (input) application[key] = input.value.trim()
    } 
    saveApplication(application)
  }

  document.addEventListener('input', saveField)
  
  // Find photo input
  document.querySelector('#photo-upload-1')?.addEventListener('change', async event => {
    const application = getApplication()

    const files = Array.from(event.target.files || [])

    application.photos = await Promise.all(files.map(file => new Promise ((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = () => resolve({
            name: file.name,
            dataIrl: reader.result
        })

        reader.onerror = reject


        reader.readAsDataURL(file)
    })))

    saveApplication(application)
    })


    if (document.querySelector('[data-application-summary]')) {
        const application = getApplication()

        const values = {
            name: application.name,
            email: localStorage.getItem('demoEmail'),
            phone: application.phone,

            address: [
                application.addressLine1,
                application.addressLine2,
                application.town,
                application.county,
                application.postcode
             ].filter(Boolean).join(','),
             
             registration: application.registration,

             photos: (application.photos || []).map(photo=> photo.name).join(',')
            
        }

        for (const[key, value] of Object.entries(values)){
            const element = document.querySelector(`[data-summary="${key}"]`)

            if (element) element.textContent = value || 'Not provided'
        }
    }