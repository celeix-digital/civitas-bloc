const url = 'http://localhost:8080/v1/front/organizations/invitation-to-join-organization'
const acceptOrganizationJoinRequest = async obj => {
  console.log('url', url)
  console.log('obj', obj)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj),
    })
    const acceptOrganizationJoinRequest = await response.json();
    console.log("acceptOrganizationJoinRequest", acceptOrganizationJoinRequest);
    return acceptOrganizationJoinRequest;
  } catch (error) {
    return null;
  }
}

const acceptOrganizationJoinRequestButton = (document.getElementById(
  'acceptOrganizationJoinRequestButton'
).onclick = async function () {
    let data = {
        organizationId: '6358e249c267802df0900e6a',
        userId:'63760952d675263e3c65bc6a',
        status:'1'
    }
    console.log("data",data)
  let response = await acceptOrganizationJoinRequest(data)
  console.log('response', response)
  if (response && response.success) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message
  } else if (response && !response.success) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message
  }
})
