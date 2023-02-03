const organization_type_url = 'https://civitas-api.herokuapp.com/v1/admin/organizations/type/list'
const register_user_with_organization_url = 'http://localhost:8081/v1/front/organizations/register-user-with-organization'
const postData = async (obj) => {
  console.log("data", obj);
  try {
    const response = await fetch(register_user_with_organization_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    console.log("response data", response);
    const registerUserWithOrganization = await response.json();
    console.log("registerUserWithOrganization", registerUserWithOrganization);
    return registerUserWithOrganization;
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
  var wallet = accounts[0]
  console.log("wallet", wallet)
  const nextData = document.getElementsByClassName("button-secondary")[1]
  console.log("after",document.getElementsByClassName("button-secondary")[1])
}

const registerButton = async() => {
  const userNameInput = document.getElementById("userNameInput");
  const userEmailInput = document.getElementById("userEmailInput");
  const userPasswordInput = document.getElementById("userPasswordInput");
  const organizationNameInput = document.getElementById("orgNameInput-2");
  const organizationTypeInput = document.getElementById("orgType-2");
  const organizationRoleInput = document.getElementById("userRole-2");
  const streetAddressInput = document.getElementById("orgAddress-4")
  const streetAddress2Input = document.getElementById("orgAddress-3")
  const organizationCityInput = document.getElementById("orgCity")
  const organizationStateInput = document.getElementById("orgState-2")
  const organizationZipInput = document.getElementById("orgZip-2")
  const organizationDescriptionInput = document.getElementById("orgDescription")
  const organizationLogoInput = document.getElementById("orgLogo")
  const organizationFormInput = document.getElementById("orgForm")
  const organizationWebsiteInput = document.getElementById("orgWebsite")
  const organizationPhoneInput = document.getElementById("orgPhone")
  const userWalletAddressInput = document.getElementById("userWalletAddress")
  const userNameValue = userNameInput.value;
  const userEmailValue = userEmailInput.value;
  const userPasswordValue = userPasswordInput.value;
  const organizationNameValue = organizationNameInput.value;
  const organizationTypeValue = organizationTypeInput.value
  const organizationRoleValue = organizationRoleInput.value;
  const streetAddressValue = streetAddressInput.value
  const streetAddress2Value = streetAddress2Input.value
  const organizationCityValue = organizationCityInput.value
  const organizationStateValue = organizationStateInput.value
  const organizationZipValue = organizationZipInput.value
  const serviceProvidedValue = organizationDescriptionInput.value
  const organizationLogoValue = organizationLogoInput.value
  const organizationFormValue = organizationFormInput.value
  const organizationWebsiteValue = organizationWebsiteInput.value
  const organizationPhoneValue = organizationPhoneInput.value
  const userWalletAddressValue = userWalletAddressInput.value
  console.log("userWalletAddressValue length", userWalletAddressValue.length)
  console.log(userNameValue, userEmailValue, userPasswordValue, organizationNameValue, organizationTypeValue, organizationRoleValue,
    streetAddressValue, streetAddress2Value, organizationCityValue, organizationStateValue, organizationZipValue
    , serviceProvidedValue, organizationLogoValue, organizationFormValue, organizationWebsiteValue
    , organizationPhoneValue, userWalletAddressValue); // 👉️ "Initial value"
  let data = {
    userName: userNameValue,
    email: userEmailValue,
    wallet: userWalletAddressValue && userWalletAddressValue.length == 42 ? userWalletAddressValue : wallet,
    password: userPasswordValue,
    name: organizationNameValue,
    type: organizationTypeValue,
    role: organizationRoleValue,
    street1: streetAddressValue,
    street2: streetAddress2Value,
    city: organizationCityValue,
    state: organizationStateValue,
    zip: organizationZipValue,
    serviceProvided: serviceProvidedValue,
    logo: organizationLogoValue,
    file: organizationFormValue,
    websiteAboutOrganization: organizationWebsiteValue,
    phone: organizationPhoneValue
  };
  console.log("data", data)
   let response = await postData(data);
   console.log("response", response)
  if (response && response.success) {
    if (userNameInput.value) userNameInput.value = "";
    if (userEmailInput.value) userEmailInput.value = "";
    if (userPasswordInput.value) userPasswordInput.value = "";
    if (organizationNameInput.value) organizationNameInput.value = "";
    if (organizationTypeInput.value) organizationTypeInput.value = "";
    if (organizationRoleInput.value) organizationRoleInput.value = "";
    if (streetAddressInput.value) streetAddressInput.value = "";
    if (streetAddress2Input.value) streetAddress2Input.value = "";
    if (organizationCityInput.value) organizationCityInput.value = "";
    if (organizationStateInput.value) organizationStateInput.value = "";
    if (organizationZipInput.value) organizationZipInput.value = "";
    if (organizationDescriptionInput.value) organizationDescriptionInput.value = "";
    if (organizationLogoInput.value) organizationLogoInput.value = "";
    if (organizationFormInput.value) organizationFormInput.value = "";
    if (organizationWebsiteInput.value) organizationWebsiteInput.value = "";
    if (organizationPhoneInput.value) organizationPhoneInput.value = "";
    if (userWalletAddressInput.value) userWalletAddressInput.value = "";
  }
}

// wallet address = 0x870Df756336063848603D68FB169f505278f86f9
const loadOrganizationTypes = async () => {
  console.log('organization_type_url', organization_type_url)
  try {
    const response = await fetch(organization_type_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    console.log('response', response)
    let data = response.data.organizationTypes;
    console.log("list organization types", data);

    
    let listOrganizationTypeHtml = '';
    listOrganizationTypeHtml += `<select id="orgType-2" name="orgType" data-name="orgType" class="form-input w-select">` + `
       <option>Select one...</option>`
    data.forEach(listorganizationType => {
      listOrganizationTypeHtml +=
        `<option value=${listorganizationType._id}>` + listorganizationType.name + `</option>`;
    });
    listOrganizationTypeHtml += `</select>`;
    console.log("listOrganizationTypeHtml", listOrganizationTypeHtml)
    document.getElementsByClassName('form-field-wrapper')[4].innerHTML = listOrganizationTypeHtml;
  } catch (error) {
    return null
  }
}
window.onload = function () {
  loadOrganizationTypes();
  const createWalletButton = document.getElementById("createWalletButton");
  createWalletButton.addEventListener("click", createWallet);

  const registerClickButton = document.getElementById("registerClickButton");
  registerClickButton.addEventListener("click", registerButton);
}