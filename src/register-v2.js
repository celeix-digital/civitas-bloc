const url = "https://civitas-api.herokuapp.com/v1/front/users/register";

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
    const signup = await response.json();
    console.log("signup", signup);
    return signup;
  } catch (error) {
    return null;
  }
};

const getAccounts = async () => {
  return await web3.eth
    .getAccounts()
    .then((accounts) => {
      return accounts;
    })
    .catch((error) => {
      console.log(error);
    });
};
const registerClickButton = (document.getElementById(
  "registerClickButton"
).onclick = async function () {
  const accounts = await getAccounts();
  console.log("accounts", accounts);
  const userNameInput = document.getElementById("userNameInput");
  const userEmailInput = document.getElementById("userEmailInput");
  const userWalletInput = document.getElementById("userWalletInput");
  const userPasswordInput = document.getElementById("userPasswordInput");
  const userNameValue = userNameInput.value;
  const userEmailValue = userEmailInput.value;
  const userPasswordValue = userPasswordInput.value;
  console.log(userNameValue, userEmailValue, userPasswordValue); // 👉️ "Initial value"
  if (!userNameValue || !userEmailValue || !userPasswordValue) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = "Please provide all required values";
    return;
  }
  let data = {
    name: userNameValue,
    wallet: accounts[0],
    email: userEmailValue,
    password: userPasswordValue,
  };
  console.log("data Register", data);
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
