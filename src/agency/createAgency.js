const createAgency = 'https://civitas-api.arhamsoft.org/v1/front/agencies/create'
var wallet;
var token;
var message;
var formData = new FormData();
const postData = async (obj) => {
  console.log("data post", obj);
  try {
    const response = await fetch(createAgency, {
      method: "POST",
      body: obj,
      headers: {
        Authorization: token
      }
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
  const userWalletAddressValue = userWalletAddressInput.value
  console.log(userNameValue, userEmailValue, userPasswordValue, agencyNameValue,
    streetAddressValue, streetAddress2Value, agencyCityValue, agencyStateValue, agencyZipValue
    , serviceProvidedValue, agencyWebsiteValue
    , agencyPhoneValue, userWalletAddressValue);

  let data = {
    userName: userNameValue,
    agencyName: agencyNameValue,
    email: userEmailValue,
    wallet: userWalletAddressValue ? userWalletAddressValue : wallet,
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
  if (!data.wallet) {
    Toastify({
      text: "Please add wallet address",
      duration: 3000,
      close: true,
      style: {
        background: "#FF7002",
      },
      onClick: function () { }
    }).showToast();
    return;
  }

  for (let key in data) {
    console.log('data[key]', data[key])
    console.log('key', key)
    formData.append(key, data[key])
  }

  Toastify({
    text: "Your form has been submitted. Please wait while your user and agency is created.",
    duration: 3000,
    close: true,
    style: {
      background: "#416ab3",
    },
    onClick: function () { }
  }).showToast();



  let response = await postData(formData);
  console.log("response", response)
  if (response.status === false) {
    message = 'Failed to authenticate token.'
    redirectPage(message)
    return;
  }
  console.log("after hit api data...", response.createUserWithAgency)


  if (response.success) {
    Toastify({
      text: response.message,
      duration: 3000,
      destination: response.txLink,
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
  for (let key in data) {
    console.log('delete key', key)
    formData.delete(key)
  }
}

function redirectPage(message) {
  Toastify({
    text: message,
    duration: 4000,
    close: true,
    style: {
      background: "#FF7002",
    },
    onClick: function () { }
  }).showToast();
  window.location.replace("https://civitasbloc.webflow.io/agency/login");
  return
}


window.onload = function () {
  const createWalletButton = document.getElementById("createWalletButton");
  createWalletButton.addEventListener("click", createWallet);
  const registerClickButton = document.getElementById("registerClickButton");
  registerClickButton.addEventListener("click", registerButton);

  const agencyLogoInput = document.getElementById('orgLogoWrapper').addEventListener('change', event => {
    const file = event.target.files[0];
    console.log('agency logo', file)
    formData.append('logo', file)
  })
}

