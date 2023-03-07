const organizationUrl = 'https://civitas-api.arhamsoft.org/v1/front/organizations/edit'
var typeUrl = 'https://civitas-api.arhamsoft.org/v1/admin/organizations/type/get-id'
var logoInput
const editOrganizationData = async obj => {
  console.log('data', obj)
  try {
    const response = await fetch(organizationUrl, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    const editOrganization = await response.json()
    console.log('editOrganization', editOrganization)
    return editOrganization
  } catch (error) {
    return null
  }
}

const postData = async data => {
  console.log('data', data)
  let name = data.type
  console.log('name', name)
  console.log('typeUrl', typeUrl)
  const url = typeUrl + '/' + name
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      } 
    })
    console.log('response', response)
    console.log('response message', response.message)
    console.log('response organizationId', response.organizationId._id)
    const organizationId = response.organizationId._id
    console.log('organizationId', organizationId)
    return organizationId
  } catch (error) {
    return null
  }
}
const userlogoInput = document
  .getElementById('userlogoInput')
  .addEventListener('change', event => {
    const target = event.target
    console.log('target', target)
    const file = target.files[0]
    console.log('file', file.name)
    logoInput = file.name
    console.log('logoInput', logoInput)
  })
const editOrganizationButton = (document.getElementById('editOrganizationButton').onclick = async function () {
  const organizationNameInput = document.getElementById('organizationNameInput')
  const types = document.getElementById('selector')
  const websiteAboutOrganizationInput = document.getElementById(
    'websiteAboutOrganizationInput'
  )
  const serviceProvidedInput = document.getElementById('serviceProvidedInput')
  const walletAddressInput = document.getElementById('walletAddressInput')
  const street1Input = document.getElementById('street1Input')
  const street2Input = document.getElementById('street2Input')
  const cityInput = document.getElementById('cityInput')
  const stateInput = document.getElementById('stateInput')
  const zipInput = document.getElementById('zipInput')
  const organizationNameValue = organizationNameInput.value
  const typeValue = types.value
  const websiteAboutOrganizationValue = websiteAboutOrganizationInput.value
  const serviceProvidedValue = serviceProvidedInput.value
  const walletAddressValue = walletAddressInput.value
  const street1Value = street1Input.value
  const street2Value = street2Input.value
  const cityValue = cityInput.value
  const stateValue = stateInput.value
  const zipValue = zipInput.value
  console.log(
    organizationNameValue,
    typeValue,
    websiteAboutOrganizationValue,
    serviceProvidedValue,
    walletAddressValue,
    street1Value,
    street2Value,
    cityValue,
    stateValue,
    zipValue
  ) // 👉️ "Initial value"
  if (!organizationNameValue || !walletAddressValue || !serviceProvidedValue) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = 'Please provide all required values'
    return
  }
  let id='6374760102837c0e44ab6002'
  let data = {
    _id:id,
    name: organizationNameValue,
    type: typeValue,
    websiteAboutOrganization: websiteAboutOrganizationValue,
    serviceProvided: serviceProvidedValue,
    walletAddress: walletAddressValue,
    logo: logoInput,
    street1: street1Value,
    street2: street2Value,
    city: cityValue,
    state: stateValue,
    zip: zipValue
  }
  console.log('edit organization data', data)
  if (data.type !== 'Type') {
     var response = await postData(data)
     data.type = response
       console.log('updated data', data)
  }
  else{
    console.log("Nothing")
    data.type = ''
  }
  response = await editOrganizationData(data)
  if (response && response.success) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message
    if (organizationNameValue.value) organizationNameValue.value = ''
    if (websiteAboutOrganizationValue.value)
      websiteAboutOrganizationValue.value = ''
    if (serviceProvidedValue.value) serviceProvidedValue.value = ''
    if (walletAddressValue.value) walletAddressValue.value = ''
    if (street1Value.value) street1Value.value = ''
    if (street2Value.value) street2Value.value = ''
    if (cityValue.value) cityValue.value = ''
    if (stateValue.value) stateValue.value = ''
    if (zipValue.value) zipValue.value = ''
    if (typeValue.value) typeValue.value = ''
  } else if (response && !response.success) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message
  }
})
