const url = 'https://civitas-api.arhamsoft.org/v1/front/organizations/send-invitation-to-user'
const sendInvitationToUser = async obj => {
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
    const sendInvitationToUser = await response.json();
    console.log("sendInvitationToUser", sendInvitationToUser);
    return sendInvitationToUser;
  } catch (error) {
    return null;
  }
}


const sendInvitationToUserButton = (document.getElementById(
  'sendInvitationToUserButton'
).onclick = async function () {
    let data = {
        organizationId: '6358e249c267802df0900e6a',
        userId:'63760952d675263e3c65bc6a',
    }
    console.log("data",data)
  let response = await sendInvitationToUser(data)
  console.log('response', response)
  if (response && response.success) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message
  } else if (response && !response.success) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message
  }
})
