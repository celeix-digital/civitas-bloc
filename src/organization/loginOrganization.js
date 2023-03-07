const loginOrganization = 'http://localhost:8081/v1/front/organizations/login'
const postData = async (obj) => {
  console.log("data post", obj);
  console.log("loginAgency url", loginOrganization);
  
  try {
    const response = await fetch(loginOrganization, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log('data response',response)
    const login = await response.json();
    console.log('loginOrganization',login)
    return login;
  } catch (error) {
    return null;
  }
};

const loginButton = async () => {
  const userEmailInput = document.getElementById("Form-10-Email");
  const userPasswordInput = document.getElementById("Form-10-Password");
  const userEmailValue = userEmailInput.value;
  const userPasswordValue = userPasswordInput.value;
  if(!userEmailValue){
    Toastify({
      text: "Please enter your email address",
      duration: 3000,   
       close: true,
       style: {
        background: "#416ab3",
      },
      onClick: function(){}
    }).showToast();  
    return;
  }
  if(!userPasswordValue){
  Toastify({
    text: "Please enter your password ",
    duration: 3000,   
     close: true,
     style: {
      background: "#416ab3",
    },
    onClick: function(){}
  }).showToast();  
  return;
}
  localStorage.clear()
  Toastify({
    text: "Your form has been submitted. Please wait.",
    duration: 3000,   
     close: true,
     style: {
      background: "#416ab3",
    },
    onClick: function(){}
  }).showToast();

  console.log(userEmailValue, userPasswordValue); 
  let data = {
    email: userEmailValue,
    password: userPasswordValue,
  };
  console.log("data...", data)
  let response = await postData(data);
  console.log("response", response)


  if(response.success){
    localStorage.setItem('accessToken',response.data.accessToken)
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
      onClick: function(){} 
    }).showToast();
    window.location.replace("https://civitasbloc.webflow.io/organization/dashboard");
  }
  else{
    localStorage.clear()
    Toastify({
      text: response.message,
      duration: 4000,   
       close: true,
      style: {
        background: "#FF7002",
      },
      onClick: function(){}
    }).showToast();
  }
  if (response && response.success) {
    if (userEmailInput.value) userEmailInput.value = "";
    if (userPasswordInput.value) userPasswordInput.value = "";
  }
}
window.onload = function () {
  const createloginButton = document.getElementById("w-node-c5fe57df-eb01-dacf-086e-c61edbdd030e-20b8a95e");
  createloginButton.addEventListener("click", loginButton);
  
}

