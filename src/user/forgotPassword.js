const url = "https://civitas-api.herokuapp.com/v1/front/users/forgot-password";
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
    const forgotPassword = await response.json();
    console.log("forgotPassword", forgotPassword);
    return forgotPassword;
  } catch (error) {
    return null;
  }
};

const forgotPasswordClickButton = (document.getElementById("forgotPasswordClickButton").onclick = async function () {
  const userEmailInput = document.getElementById("userEmailInput");
  const userEmailValue = userEmailInput.value;
  console.log( userEmailValue); // 👉️ "Initial value"
  if ( !userEmailValue ) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = "Please provide all required values";
    return;
  }
  let data = {
    email: userEmailValue,
  };
  console.log("data login", data);
  let response = await postData(data);
  console.log("response", response);
  if (response && response.status) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message;
    if (userEmailInput.value) userEmailInput.value = "";
  } else if (response && !response.status) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message;
  }
});
