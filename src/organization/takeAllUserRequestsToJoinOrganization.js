let url = 'http://localhost:8080/v1/front/organizations/take-requests-to-join-organization'
const takeUserRequestToJoinOrganization = async status => {
  console.log('url', url)
  console.log('status', status)
  url = url + '/' + status;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
        if (response.ok) {
          return response.json()
        } 
      })
      console.log('response', response)
      return response;
    } catch (error) {
      return null
    }
}
const takeUserRequestToJoinOrganizationButton = (document.getElementById(
  'takeUserRequestToJoinOrganizationButton'
).onclick = async function () {
    let status = '2'
  let response = await takeUserRequestToJoinOrganization(status)
  console.log('response', response)
  if (response && response.success) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message
  } else if (response && !response.success) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message
  }
})
