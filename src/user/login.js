const civitas_api_url = "https://civitas-api.herokuapp.com/v1/front/users/login";
const postData = async (obj) => {
  console.log("data", obj);
  try {
    const response = await fetch(civitas_api_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log("response data", response);
    const signin = await response.json();
    console.log("signin", signin);
    return signin;
  } catch (error) {
    return null;
  }
};

const loginClickButton = (document.getElementById("loginClickButton").onclick = async function () {
  const userEmailInput = document.getElementById("userEmailInput");
  const userPasswordInput = document.getElementById("userPasswordInput");
  const userEmailValue = userEmailInput.value;
   const userPasswordValue = userPasswordInput.value;
  console.log( userEmailValue, userPasswordValue); // 👉️ "Initial value"
  if ( !userEmailValue || !userPasswordValue) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = "Please provide all required values";
    return;
  }
  let data = {
    email: userEmailValue,
    password: userPasswordValue,
  };
  console.log("data login", data);
  let response = await postData(data);
  console.log("response", response);
  if (response && response.status) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message;
    if (userEmailInput.value) userEmailInput.value = "";
    if (userPasswordInput.value) userPasswordInput.value = "";
  } else if (response && !response.status) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message;
  }
});
