const createAgency = 'http://localhost:8081/v1/front/agencies/create'
let wallet;
let token;
let message;
let data;
let formData = new FormData();
const postData = async (obj) => {
  console.log("data post", obj);
  try {
    const response = await fetch(createAgency, {
      method: "POST",
      body: obj,
    });

    const createUserWithAgency = await response.json();
    return createUserWithAgency;
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
const createWallet = async () => {
  const accounts = await getAccounts();
  console.log("accounts wallet address", accounts);
  document.getElementById("userWalletAddress").value = accounts[0];
  wallet = accounts[0]
  console.log("wallet", wallet)
}
const submitToast = () => {
  Toastify({
    text: "Your form has been submitted. Please wait while your user and agency is created.",
    duration: 3000,
    close: true,
    style: {
      background: "#416ab3",
    },
    onClick: function () { }
  }).showToast();
}
const checkResponse = (message, txLink, backgroundcolor) => {
  Toastify({
    text: message,
    duration: 3000,
    destination: txLink,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: `${backgroundcolor}`,
    },
    onClick: function () { }
  }).showToast();
}
const registerButton = async () => {
  const userNameInput = document.getElementById("userNameInput");
  const userEmailInput = document.getElementById("userEmailInput");
  const userPasswordInput = document.getElementById("userPasswordInput");
  const agencyNameInput = document.getElementById("orgNameInput-2");
  const streetAddressInput = document.getElementById("orgAddress-4")
  const streetAddress2Input = document.getElementById("orgAddress-3")
  const agencyCityInput = document.getElementById("orgCity")
  const agencyStateInput = document.getElementById("orgState-2")
  const agencyZipInput = document.getElementById("orgZip-2")
  const agencyDescriptionInput = document.getElementById("orgDescription")
  const agencyWebsiteInput = document.getElementById("orgWebsite")
  const agencyPhoneInput = document.getElementById("orgPhone")
  const userWalletAddressInput = document.getElementById("userWalletAddress")
  const userNameValue = userNameInput.value;
  const userEmailValue = userEmailInput.value;
  const userPasswordValue = userPasswordInput.value;
  const agencyNameValue = agencyNameInput.value
  const streetAddressValue = streetAddressInput.value
  const streetAddress2Value = streetAddress2Input.value
  const agencyCityValue = agencyCityInput.value
  const agencyStateValue = agencyStateInput.value
  const agencyZipValue = agencyZipInput.value
  const serviceProvidedValue = agencyDescriptionInput.value
  const agencyWebsiteValue = agencyWebsiteInput.value
  const agencyPhoneValue = agencyPhoneInput.value
   wallet = userWalletAddressInput.value
  console.log(userNameValue, userEmailValue, userPasswordValue, agencyNameValue,
    streetAddressValue, streetAddress2Value, agencyCityValue, agencyStateValue, agencyZipValue
    , serviceProvidedValue, agencyWebsiteValue
    , agencyPhoneValue, wallet);
   data = {
    userName: userNameValue,
    agencyName: agencyNameValue,
    email: userEmailValue,
    wallet: wallet,
    password: userPasswordValue,
    street1: streetAddressValue,
    street2: streetAddress2Value,
    city: agencyCityValue,
    state: agencyStateValue,
    zip: agencyZipValue,
    serviceProvided: serviceProvidedValue,
    websiteAboutOrganization: agencyWebsiteValue,
    phone: agencyPhoneValue
  };
  console.log("data...", data)
  console.log('check wallet', wallet)
  appendData(data)
  submitToast()
  let response = await postData(formData);
  console.log("response", response)
  console.log("after hit api data...", response.createUserWithAgency)
  if (response.success) {
    checkResponse(response.message, response.txLink, backgroundcolor = "green")
  }
  else {
    checkResponse(response.message, txLink = "", backgroundcolor = "#FF7002")
  }
  if (response && response.success) {
    if (userNameInput.value) userNameInput.value = "";
    if (userEmailInput.value) userEmailInput.value = "";
    if (userPasswordInput.value) userPasswordInput.value = "";
    if (agencyNameInput.value) agencyNameInput.value = "";
    if (streetAddressInput.value) streetAddressInput.value = "";
    if (streetAddress2Input.value) streetAddress2Input.value = "";
    if (agencyCityInput.value) agencyCityInput.value = "";
    if (agencyStateInput.value) agencyStateInput.value = "";
    if (agencyZipInput.value) agencyZipInput.value = "";
    if (agencyDescriptionInput.value) agencyDescriptionInput.value = "";
    if (agencyWebsiteInput.value) agencyWebsiteInput.value = "";
    if (agencyPhoneInput.value) agencyPhoneInput.value = "";
    if (userWalletAddressInput.value) userWalletAddressInput.value = "";
    wallet = ""
  }
  deleteData(data)
}
function appendData(data){
  for (let key in data) {
    formData.append(key, data[key])
  }
}

function deleteData(data){
  for (let key in data) {
    console.log('delete key', key)
    formData.delete(key)
  }
}
window.onload = function () {
  const createWalletButton = document.getElementById("createWalletButton");
  createWalletButton.addEventListener("click", createWallet);
  const registerClickButton = document.getElementById("registerClickButton");
  registerClickButton.addEventListener("click", registerButton);
  document.getElementById('orgLogoWrapper').addEventListener('change', event => {
    const file = event.target.files[0];
    console.log('agency logo', file)
    formData.append('logo', file)
  })
}

