const url = 'http://localhost:8080/v1/front/organizations/accept-user-join-request'
const processUserRequest = async obj => {
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
    const processUserRequest = await response.json();
    console.log("processUserRequest", processUserRequest);
    return processUserRequest;
  } catch (error) {
    return null;
  }
}
const processUserRequestButton = (document.getElementById(
  'processUserRequestButton'
).onclick = async function () {
    let data = {
        id: '63760952d675263e3c65bc6e',
        status:'2'
    }
    console.log("data",data)
  let response = await processUserRequest(data)
  console.log('response', response)
  if (response && response.success) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message
  } else if (response && !response.success) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message
  }
})
