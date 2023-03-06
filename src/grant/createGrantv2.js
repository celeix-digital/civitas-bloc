const contractAddress = "0x27475ae8eb02b7da4261c843586b81622a689e50";
var token;
var message;
const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "AgencyAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "GrantCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "GrantUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "OrgAdded", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "AllAgency", "outputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "NoOfGrants", "type": "uint256" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "AllGrant", "outputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes32", "name": "agencyId", "type": "bytes32" }, { "internalType": "address", "name": "Approver", "type": "address" }, { "internalType": "uint256", "name": "Budget", "type": "uint256" }, { "internalType": "address", "name": "Creator", "type": "address" }, { "internalType": "bool", "name": "Approved", "type": "bool" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "AllGrantSpent", "outputs": [{ "internalType": "bytes32", "name": "grantId", "type": "bytes32" }, { "internalType": "bytes32", "name": "orgId", "type": "bytes32" }, { "internalType": "uint256", "name": "Balance", "type": "uint256" }, { "internalType": "uint256", "name": "TotalBudgetAppointed", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "AllOrganization", "outputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_agencyAddress", "type": "address" }, { "internalType": "bytes32", "name": "_id", "type": "bytes32" }, { "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "uint256", "name": "_balance", "type": "uint256" }, { "internalType": "uint256", "name": "_noOfGrants", "type": "uint256" }, { "internalType": "bytes32", "name": "_infoLink", "type": "bytes32" }], "name": "addAgency", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes32", "name": "agencyId", "type": "bytes32" }, { "internalType": "address", "name": "Approver", "type": "address" }, { "internalType": "uint256", "name": "Budget", "type": "uint256" }, { "internalType": "address", "name": "Creator", "type": "address" }, { "internalType": "bool", "name": "Approved", "type": "bool" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "name": "addGrant", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "bytes32", "name": "_id", "type": "bytes32" }, { "internalType": "bytes32", "name": "_infoLink", "type": "bytes32" }], "name": "addOrg", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_agencyAddress", "type": "address" }, { "internalType": "bytes32", "name": "_id", "type": "bytes32" }, { "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "uint256", "name": "_balance", "type": "uint256" }, { "internalType": "uint256", "name": "_noOfGrants", "type": "uint256" }, { "internalType": "bytes32", "name": "_infoLink", "type": "bytes32" }], "name": "updateGrantSpent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

async function onInit(grantId="11111111111111111111111", totalBudget=100000) {
  console.log(window.ethereum)
  let web3;
  let fromAddress;
  if(window.ethereum) {
    await window.ethereum.enable();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log('accounts', accounts)
    fromAddress = accounts[0];
    console.log('account', fromAddress);
    web3 = new Web3(window.ethereum)
  }
  else {
    const customNodeOptions = {
      rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
      chainId: 80001, // Polygon chain id
    }
    // const magic = new Magic('pk_live_350FEFDEDF81F26B', customNodeOptions);

    // const magic= new Magic('pk_live_350FEFDEDF81F26BY', { network: customNodeOptions });
    const magic= new Magic('pk_live_350FEFDEDF81F26B', { network: customNodeOptions });
    magic.network='matic';
    web3 = new Web3(magic.rpcProvider);
    
    fromAddress = (await web3.eth.getAccounts())[0];
    console.log("fromAddressfromAddressfromAddressfromAddressfromAddressfromAddress");
    console.log(fromAddress);
  }

  grantId = "0x" + grantId
  totalBudget = totalBudget
  const celiexContract = new web3.eth.Contract(contractABI, contractAddress)
  // '0x11111111111111111111111111'
  // '123444444'
  celiexContract.methods
    .addGrant(grantId, '0x11111111111111111111111', '0x7Eb0156eF2b1d3545c8684d9eb005207Aaa723B7', totalBudget, '0x7Eb0156eF2b1d3545c8684d9eb005207Aaa723B7', false, '0x1111111')
    .send({ from: fromAddress }, function (err, res) {
      if (err) {
        console.log("An error occurred", err)
        return
      }
      console.log("Hash of the transaction: " + res)
    })
}

const creategrantUrl = 'https://civitas-api.arhamsoft.org/v1/front/grants/create'
var eligibleEntityTypes = []

const postData = async (obj) => {
  console.log("payload: ", obj);
  console.log("grantUrl", creategrantUrl);
  const getToken = localStorage.getItem('accessToken');
  console.log('getToken', getToken)
  try {
    const response = await fetch(creategrantUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(obj),
    });
    console.log('response',response)
    if (response ===undefined) {
      message = 'Failed to authenticate token.'
      redirectPage(message)
      return;
    }

    const createGrant = await response.json();
    console.log("createGrant", createGrant);
    return createGrant;
  } catch (error) {
    return null;
  }
};


const submitReview = async () => {
  Toastify({
    text: "Your form has been submitted. Please wait while your user and organization is created.",
    duration: 1000,
    close: true,
    style: {
      height: "50px",
      backgroundColor: "blue",
      fontsize: "15px",
      color: "white"
    },
    onClick: function () { }
  }).showToast();

  const grantNameInput = document.getElementById("grantNameInput");
  const opportunityNumberInput = document.getElementById("oppNumberInput");
  const grantCategoryInput = document.getElementById("oppCategory");
  const opportunitySummaryInput = document.getElementById("field");
  const eligibleDetailsInput = document.getElementById("eligibleDetailsInput");
  const totalBudgetInput = document.getElementById("totalBudgetInput");
  const awardCeilingInput = document.getElementById("awardCeilingInput")
  const awardFloorInput = document.getElementById("awardFloorInput")
  const fundingTypeInput = document.getElementById("fundingTypeInput")
  const reportingDetailsInput = document.getElementById("reportingDetailsInput")


  const grantNameValue = grantNameInput.value;
  const opportunityNumberValue = opportunityNumberInput.value;
  const grantCategoryValue = grantCategoryInput.value;
  const opportunitySummaryValue = opportunitySummaryInput.value;
  const eligibleEntityValues = eligibleEntityTypes
  const eligibleDetailsValue = eligibleDetailsInput.value
  const totalBudgetValue = totalBudgetInput.value;
  const awardCeilingValue = awardCeilingInput.value
  const awardFloorValue = awardFloorInput.value
  const fundingTypeValue = fundingTypeInput.value
  const reportingDetailsValue = reportingDetailsInput.value
  console.log(grantNameValue, opportunityNumberValue, grantCategoryValue, opportunitySummaryValue, eligibleEntityValues, eligibleDetailsValue
    , totalBudgetValue, awardCeilingValue, awardFloorValue, fundingTypeValue, reportingDetailsValue);// ðŸ‘‰ï¸ "Initial value"
  let data = {
    name: grantNameValue,
    opportunityNumber: opportunityNumberValue,
    categories: grantCategoryValue,
    executiveSummary: opportunitySummaryValue,
    eligibleEntityTypes: eligibleEntityValues,
    eligibilityCriteria: eligibleDetailsValue,
    totalBudget: totalBudgetValue,
    awardCeiling: awardCeilingValue,
    awardFloor: awardFloorValue,
    // fundingType: fundingTypeValue,
    reportingDetails: reportingDetailsValue
  };
  console.log("data", data)
  let response = await postData(data);

  if (response && response.code === 500) {
    console.log('code')
    Toastify({
      text: response.message,
      duration: 4000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "red",
      },
      onClick: function () { }
    }).showToast();
    return;
  }

  if (response && response.success) {
    console.log('true')
    const getGrantId = response.grants._id;
    console.log("getGrantId", getGrantId)
    const totalBudget = response.grants.totalBudget;
    console.log("totalBudget", totalBudget)
    onInit(getGrantId, totalBudget);
    Toastify({
      text: response.message,
      duration: 4000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () { }
    }).showToast();
  }
  else {
    console.log('false')
    Toastify({
      text: response.message,
      duration: 4000,
      close: true,
      style: {
        background: "red",
      },
      onClick: function () { }
    }).showToast();
  }
  console.log("response", response)
  console.log("response web3 data", response.grants)
  if (response && response.success) {
    if (grantNameInput.value) grantNameInput.value = "";
    if (opportunityNumberInput.value) opportunityNumberInput.value = "";
    if (grantCategoryInput.value) grantCategoryInput.value = "";
    if (opportunitySummaryInput.value) opportunitySummaryInput.value = "";
    if (totalBudgetInput.value) totalBudgetInput.value = "";
    if (awardCeilingInput.value) awardCeilingInput.value = "";
    if (awardFloorValue.value) awardFloorValue.value = "";
    if (reportingDetailsValue.value) reportingDetailsValue.value = "";
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

const listGrantCategories = async () => {
  try {
    const response = await fetch('https://civitas-api.arhamsoft.org/v1/front/grants/list-active-categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }).then(response => {
      console.log('response', response)
      if (response.ok) {
        return response.json()
      }
    })
    if (response ===undefined) {
      message = 'Failed to authenticate token.'
      redirectPage(message)
      return
    }
    let data = response.activeCategoryTypes;
    console.log("list grant categories", data);

    let grantCategoriesHtml = '';
    grantCategoriesHtml += `<select id="oppCategory" name="oppCategory" data-name="oppCategory" class="form-input is-select-input w-select">`
      + `<option>Select one...</option>`
    data.forEach(grantCategories => {
      grantCategoriesHtml +=
        `<option value=${grantCategories._id}>` + grantCategories.name + `</option>`;
    });
    grantCategoriesHtml += `</select>`;
    document.getElementsByClassName('form-field-wrapper')[2].innerHTML = grantCategoriesHtml;

  } catch (err) {
    console.log(err)
  }
}


window.onload = function () {
  onInit();
  return
  token = localStorage.getItem('accessToken');
  console.log('token', token)
  if (!token) {
    message = 'Please login to access Grant Page'
    redirectPage(message);
  }
  else {
  listGrantCategories()
  function MaptoNumber(name) {
    if (name == "non-profit") {
      return 0
    }
    if (name == "individual") {
      return 1;
    }
    if (name == "businesses") {
      return 2;
    }
  }

  function isExsist(name) {
    const obj = {}
    let getNUmber = MaptoNumber(name)
    console.log("getNumber", getNUmber)
    if (eligibleEntityTypes.includes(getNUmber)) {
      obj['Number'] = getNUmber;
      obj['Name'] = name;
      obj['bool'] = true;
      return obj
    }
    else {
      obj['Number'] = getNUmber;
      obj['Name'] = name;
      obj['bool'] = false;
      return obj
    }
  }

  const eligibleEntityList = document.getElementsByClassName("form-field-wrapper")[4];
  console.log("eligibleEntityList", eligibleEntityList)
  eligibleEntityList.addEventListener('change', async (event) => {
    console.log("event dispatched", event)
    console.log("event.target.name", event.target.name)
    const name = event.target.name;
    var idIndex;
    let check = isExsist(name)
    if (check.bool) {
      console.log("check true", check)
      for (let key in eligibleEntityTypes) {
        if (eligibleEntityTypes[key] == check.Number) {
          idIndex = eligibleEntityTypes.indexOf(check.Number);
          eligibleEntityTypes.splice(idIndex, 1);
        }
      }
      console.log("eligibleEntityTypes", eligibleEntityTypes)
    }
    else {
      console.log("check false", check)
      eligibleEntityTypes.push(check.Number)
      console.log("eligibleEntityTypes", eligibleEntityTypes)
    }
  })
  const submitReviewButton = document.getElementById("w-node-_5a442b79-7394-7141-13fc-32e9051ae335-669865ff");
  console.log("submitReviewButton", submitReviewButton)
  submitReviewButton.addEventListener("click", submitReview);
}
}