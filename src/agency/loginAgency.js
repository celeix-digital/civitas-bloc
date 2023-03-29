const loginAgency = "http://localhost:8081/v1/front/agencies/login-agency"
const postData = async (obj) => {
  console.log("data post", obj);
  console.log("loginAgency url", loginAgency);
  try {
    const response = await fetch(loginAgency, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log('data response', response)
    const login = await response.json();
    console.log('loginAgency', login)
    return login;
  } catch (error) {
    console.log('error', error)
    return null;
  }
};

function getResponse(message, backgroundcolor) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    style: {
      background: backgroundcolor,
    },
    onClick: function () { }
  }).showToast();
}
const loginButton = async () => {
  const userEmailInput = document.getElementById("Form-10-Email");
  const userPasswordInput = document.getElementById("Form-10-Password");
  const userEmailValue = userEmailInput.value;
  const userPasswordValue = userPasswordInput.value;
  if (!userEmailValue) {
    getResponse(message = "Please enter your email address", backgroundcolor = "#416ab3")
    return;
  }

  if (!userPasswordValue) {
    getResponse(message = "Please enter your password", backgroundcolor = "#416ab3")
    return;
  }
  getResponse(message = "Your form has been submitted. Please wait.", backgroundcolor = "#416ab3")
  console.log(userEmailValue, userPasswordValue);
  let data = {
    email: userEmailValue,
    password: userPasswordValue,
  };
  console.log("data...", data)
  let response = await postData(data);
  console.log("response", response)

  if (response.success) {
    localStorage.setItem('accessToken', response.data.accessToken)
    getResponse(response.message, backgroundcolor = "green")
    window.location.replace("https://civitasbloc.webflow.io/agency/dashboard");
  }
  else {
    localStorage.removeItem('accessToken') 
    getResponse(response.message, backgroundcolor = "#FF7002")
  }
  if (response && response.success) {
    if (userEmailInput.value) userEmailInput.value = "";
    if (userPasswordInput.value) userPasswordInput.value = "";
  }
}
window.onload = function () {
  console.log('login agency')
  const createloginButton = document.getElementById("w-node-_4e84affd-5009-8f99-1d6b-4107f30fdd94-39a6fc7e");
  createloginButton.addEventListener("click", loginButton);
}
