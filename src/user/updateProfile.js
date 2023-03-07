const url = "https://civitas-api.arhamsoft.org/v1/front/users/update-profile"
var imageInput;
const postData = async (obj) => {
  console.log("data", obj);
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log("response data", response);
    const updateProfile = await response.json();
    console.log("updateProfile", updateProfile);
    return updateProfile;
  } catch (error) {
    return null;
  }
};

const userImageInput = document.getElementById('userImageInput').addEventListener('change',event=>{
   const target = event.target;
   console.log("target",target);
   const file = (target.files )[0]
   console.log('file', file.name)
    imageInput = file.name
   console.log("imageInput",imageInput)
})
const updateClickButton = (document.getElementById("updateClickButton").onclick = async function () {
    const userNameInput = document.getElementById("userNameInput");
  const userEmailInput = document.getElementById("userEmailInput");
  const userPasswordInput = document.getElementById("userPasswordInput");
  const userNameValue = userNameInput.value;
  const userEmailValue = userEmailInput.value;
   const userPasswordValue = userPasswordInput.value;
  console.log(userNameValue, userEmailValue, userPasswordValue); // 👉️ "Initial value"
  let id="6353b4b22c2cd200161878f9";
  let data = {
    _id:id,
    email: userEmailValue,
    password: userPasswordValue,
    name:userNameValue,
    image:imageInput,
  };
  console.log("data login", data);
  let response = await postData(data);
  console.log("response", response);
  if (response && response.status) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message;
      if (userNameInput.value) userNameInput.value = "";
    if (userEmailInput.value) userEmailInput.value = "";
    if (userPasswordInput.value) userPasswordInput.value = "";
  } else if (response && !response.status) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message;
  }
});