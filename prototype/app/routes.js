//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/create-routes/
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here
router.post('/application-portal/choose-installer', (req, res) => {
  const installer = (req.body.selectedInstaller || '').trim()

  if (!installer) {
    return res.redirect('/application-portal/choose-installer')
  }

  req.session.data.selectedInstaller = installer

  // A submitted selection needs its code confirming.
  req.session.data.installerCode = ''
  req.session.data.installerChosen = false

// Reset the installation confirmations.
  req.session.data.installationAgreements = []
  req.session.data.installationConfirmed = false


  res.redirect('/application-portal/installer-code')
})

router.post('/application-portal/installer-code', (req, res) => {
  if (!req.session.data.selectedInstaller) {
    return res.redirect('/application-portal/choose-installer')
  }

  const code = (req.body.installerCode || '').trim()

  if (!code) {
    return res.redirect('/application-portal/installer-code')
  }

  req.session.data.installerCode = code
  req.session.data.installerChosen = true

  res.redirect('/application-portal/dashboard')
})

router.post('/application-portal/confirm-installation', (req, res) => {
  if (!req.session.data.installerChosen) {
    return res.redirect('/application-portal/choose-installer')
  }

  const submitted = req.body.installationAgreements || []
  const agreements = Array.isArray(submitted) ? submitted : [submitted]

  req.session.data.installationAgreements = agreements

  const confirmed =
    agreements.includes('date') && agreements.includes('cost')

  req.session.data.installationConfirmed = confirmed

  if (!confirmed) {
    return res.render('application-portal/confirm-installation', {
      confirmationError:
        'Confirm that you have agreed both the installation date and cost'
    })
  }

  res.redirect('/application-portal/dashboard')
})