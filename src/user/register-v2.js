const civitas_api_url = "https://civitas-api.herokuapp.com/v1/front/users/register";

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

const getAccounts = async () => {
  let magic = new Magic("pk_live_242B3D2FF05F08CD", {
    network: "goerli",
    extensions: [new MagicConnectExtension()],
  });
  let web3 = new Web3(magic.rpcProvider);
  
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
  // const accounts = await getAccounts();
  // console.log("accounts", accounts);
  const userNameInput = document.getElementById("userNameInput");
  const userEmailInput = document.getElementById("userEmailInput");
  const userPasswordInput = document.getElementById("userPasswordInput");
  const userWalletAddress = document.getElementById("userWalletAddress");
  const userNameValue = userNameInput.value;
  const userEmailValue = userEmailInput.value;
  const userPasswordValue = userPasswordInput.value;
  console.log(userNameValue, userEmailValue, userPasswordValue); // ðŸ‘‰ï¸ "Initial value"
  if (!userNameValue || !userEmailValue || !userPasswordValue || !userWalletAddress) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = "Please provide all required values";
    return;
  }
  let data = {
    name: userNameValue,
    wallet: userWalletAddress,
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

const createWalletButton = (document.getElementById(
  "createWalletButton"
).onclick = async function () {
  const accounts = await getAccounts();
  console.log("accounts", accounts);
  const userNameInput = document.getElementById("userWalletAddress");
  userNameInput.value = accounts;
});