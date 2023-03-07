const url = "https://civitas-api.arhamsoft.org/v1/front/users/reset-password";
const postData = async (obj) => {
  console.log("data", obj);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log("response data", response);
    const resetPassword = await response.json();
    console.log("resetPassword", resetPassword);
    return resetPassword;
  } catch (error) {
    return null;
  }
};

const resetPasswordClickButton = (document.getElementById("resetPasswordClickButton").onclick = async function () {
  const userPasswordInput = document.getElementById("userPasswordInput");
  const userPasswordValue = userPasswordInput.value;
  console.log( userPasswordValue); // 👉️ "Initial value"
  if ( !userPasswordValue ) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = "Please provide all required values";
    return;
  }
  let id="6353b4b22c2cd200161878f9"
  let token="6V5r9Sykcj"
  let data = {
    id:id,
    token:token,
    password: userPasswordValue,
  };
  console.log("data login", data);
  let response = await postData(data);
  console.log("response", response);
  if (response && response.status) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message;
    if (userPasswordInput.value) userPasswordInput.value = "";
  } else if (response && !response.status) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message;
  }
});
