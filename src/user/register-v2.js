const civitas_api_url = "https://civitas-api.arhamsoft.org/v1/front/users/register";

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
    const signup = await response.json();
    console.log("signup", signup);
    return signup;
  } catch (error) {
    return null;
  }
};
const registerButton = async () => {
  const userNameInput = document.getElementById("Sign-up-Form-7-Name");
  const userEmailInput = document.getElementById("Sign-up-Form-7-Email");
  const userPasswordInput = document.getElementById("Sign-up-Form-7-Password");
  const name = userNameInput.value;
  const email = userEmailInput.value;
  const password = userPasswordInput.value;
  console.log(name, email, email);
  let data = {
    name,
    email,
    password
  };
  console.log("data Register", data);
  let response = await postData(data);
  console.log("response", response);

  if (response.success) {
    Toastify({
      text: response.message,
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "green",
      },
      onClick: function () { }
    }).showToast();
    window.location.replace("https://civitasbloc.webflow.io/organization/dashboard");
  }
  else {
    Toastify({
      text: response.message,
      duration: 4000,
      close: true,
      style: {
        background: "#FF7002",
      },
      onClick: function () { }
    }).showToast();
  }

  if (response && response.success) {
    if (userNameInput.value) userNameInput.value = "";
    if (userEmailInput.value) userEmailInput.value = "";
    if (userPasswordInput.value) userPasswordInput.value = "";
  }
};


window.onload = function () {
  const registerClickButton = document.getElementById("w-node-_615332f6-3d02-49a9-4a6f-afc7bb46b6ea-45e18da5");
  registerClickButton.addEventListener("click", registerButton);
}