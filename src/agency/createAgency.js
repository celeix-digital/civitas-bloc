// const organization_type_url = 'https://civitas-api.herokuapp.com/v1/admin/organizations/type/list'
const createAgency = 'https://civitas-api.herokuapp.com/v1/front/agencies/create'
var wallet;
const postData = async (obj) => {
  console.log("data post", obj);
  try {
    const response = await fetch(createAgency, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
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
  Toastify({
    text: "Your form has been submitted. Please wait while your user and agency is created.",
    duration: 1000,   
     close: true,
     style: {
      background: "blue",
    },
    onClick: function(){}
  }).showToast();


  const userNameInput = document.getElementById("userNameInput");
  const userEmailInput = document.getElementById("userEmailInput");
  const userPasswordInput = document.getElementById("userPasswordInput");
  const agencyNameInput = document.getElementById("orgNameInput-2");
//   const organizationTypeInput = document.getElementById("orgType-2");
//   const organizationRoleInput = document.getElementById("userRole-2");
  const streetAddressInput = document.getElementById("orgAddress-4")
  const streetAddress2Input = document.getElementById("orgAddress-3")
  const agencyCityInput = document.getElementById("orgCity")
  const agencyStateInput = document.getElementById("orgState-2")
  const agencyZipInput = document.getElementById("orgZip-2")
  const agencyDescriptionInput = document.getElementById("orgDescription")
  const agencyLogoInput = document.getElementById("orgLogo")
  const agencyFormInput = document.getElementById("orgForm")
  const agencyWebsiteInput = document.getElementById("orgWebsite")
  const agencyPhoneInput = document.getElementById("orgPhone")
  const userWalletAddressInput = document.getElementById("userWalletAddress")

  const userNameValue = userNameInput.value;
  const userEmailValue = userEmailInput.value;
  const userPasswordValue = userPasswordInput.value;
  const agencyNameValue = agencyNameInput.value
//   const organizationTypeValue = organizationTypeInput.value
//   const organizationRoleValue = organizationRoleInput.value
  const streetAddressValue = streetAddressInput.value
  const streetAddress2Value = streetAddress2Input.value
  const agencyCityValue = agencyCityInput.value
  const agencyStateValue = agencyStateInput.value
  const agencyZipValue = agencyZipInput.value
  const serviceProvidedValue = agencyDescriptionInput.value
  const agencyLogoValue = agencyLogoInput.value
  const agencyFormValue = agencyFormInput.value
  const agencyWebsiteValue = agencyWebsiteInput.value
  const agencyPhoneValue = agencyPhoneInput.value
  const userWalletAddressValue = userWalletAddressInput.value
  console.log(userNameValue, userEmailValue, userPasswordValue, agencyNameValue,
    streetAddressValue, streetAddress2Value, agencyCityValue, agencyStateValue, agencyZipValue
    , serviceProvidedValue, agencyLogoValue, agencyFormValue, agencyWebsiteValue
    , agencyPhoneValue, userWalletAddressValue); 
  let data = {
    userName:userNameValue,
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
    logo: agencyLogoValue,
    file: agencyFormValue,
    websiteAboutOrganization: agencyWebsiteValue,
    phone: agencyPhoneValue
  };
  console.log("data...", data)
  console.log('check wallet',wallet)
  if(!data.wallet){
    Toastify({
      text: "Please add wallet address",
      duration: 3000,   
       close: true,
      style: {
        background: "red",
      },
      onClick: function(){}
    }).showToast();
    return;
  }

  let response = await postData(data);
  console.log("response", response)
  console.log("after hit api data...", response.createUserWithAgency)


  if(response.success){
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
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function(){} 
    }).showToast();
  }
  else{
    Toastify({
      text: response.message,
      duration: 4000,   
       close: true,
      style: {
        background: "red",
      },
      onClick: function(){}
    }).showToast();
  }
  if (response && response.success) {
    if (userNameInput.value) userNameInput.value = "";
    if (userEmailInput.value) userEmailInput.value = "";
    if (userPasswordInput.value) userPasswordInput.value = "";
    if (agencyNameInput.value) agencyNameInput.value = "";
    // if (organizationTypeInput.value) organizationTypeInput.value = "";
    // if (organizationRoleInput.value) organizationRoleInput.value = "";
    if (streetAddressInput.value) streetAddressInput.value = "";
    if (streetAddress2Input.value) streetAddress2Input.value = "";
    if (agencyCityInput.value) agencyCityInput.value = "";
    if (agencyStateInput.value) agencyStateInput.value = "";
    if (agencyZipInput.value) agencyZipInput.value = "";
    if (agencyDescriptionInput.value) agencyDescriptionInput.value = "";
    if (agencyLogoInput.value) agencyLogoInput.value = "";
    if (agencyFormInput.value) agencyFormInput.value = "";
    if (agencyWebsiteInput.value) agencyWebsiteInput.value = "";
    if (agencyPhoneInput.value) agencyPhoneInput.value = "";
    if (userWalletAddressInput.value) userWalletAddressInput.value = "";
    wallet=""
  }
}
// const loadOrganizationTypes = async () => {
// //   console.log('organization_type_url', organization_type_url)
//   try {
//     const response = await fetch(organization_type_url, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     }).then(response => {
//       if (response.ok) {
//         return response.json()
//       }
//     })
//     console.log('response', response)
//     let data = response.data.organizationTypes;


//     let listOrganizationTypeHtml = '';
//     listOrganizationTypeHtml += `<select id="orgType-2" name="orgType" data-name="orgType" class="form-input w-select">` + `
//        <option>Select one...</option>`
//     data.forEach(listorganizationType => {
//       listOrganizationTypeHtml +=
//         `<option value=${listorganizationType._id}>` + listorganizationType.name + `</option>`;
//     });
//     listOrganizationTypeHtml += `</select>`;
//     document.getElementsByClassName('form-field-wrapper')[4].innerHTML = listOrganizationTypeHtml;
//   } catch (error) {
//     return null
//   }
// }
window.onload = function () {
//   loadOrganizationTypes();
  const createWalletButton = document.getElementById("createWalletButton");
  createWalletButton.addEventListener("click", createWallet);
  const registerClickButton = document.getElementById("registerClickButton");
  registerClickButton.addEventListener("click", registerButton);
}

