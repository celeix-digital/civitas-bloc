const contractAddress = "0xb9c0cc4e755664f01ed86f110f2472d19b318aa3";
const blockChainExplorer = "https://mumbai.polygonscan.com/"
var message;
const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "AgencyAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "GrantCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "GrantUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "OrgAdded", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "AllAgency", "outputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "NoOfGrants", "type": "uint256" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "AllGrant", "outputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes32", "name": "agencyId", "type": "bytes32" }, { "internalType": "address", "name": "Approver", "type": "address" }, { "internalType": "uint256", "name": "Budget", "type": "uint256" }, { "internalType": "address", "name": "Creator", "type": "address" }, { "internalType": "bool", "name": "Approved", "type": "bool" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "AllGrantSpent", "outputs": [{ "internalType": "bytes32", "name": "grantId", "type": "bytes32" }, { "internalType": "bytes32", "name": "orgId", "type": "bytes32" }, { "internalType": "uint256", "name": "Balance", "type": "uint256" }, { "internalType": "uint256", "name": "TotalBudgetAppointed", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "AllOrganization", "outputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_agencyAddress", "type": "address" }, { "internalType": "bytes32", "name": "_id", "type": "bytes32" }, { "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "uint256", "name": "_balance", "type": "uint256" }, { "internalType": "uint256", "name": "_noOfGrants", "type": "uint256" }, { "internalType": "bytes32", "name": "_infoLink", "type": "bytes32" }], "name": "addAgency", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes32", "name": "agencyId", "type": "bytes32" }, { "internalType": "address", "name": "Approver", "type": "address" }, { "internalType": "uint256", "name": "Budget", "type": "uint256" }, { "internalType": "address", "name": "Creator", "type": "address" }, { "internalType": "bool", "name": "Approved", "type": "bool" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "name": "addGrant", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "bytes32", "name": "_id", "type": "bytes32" }, { "internalType": "bytes32", "name": "_infoLink", "type": "bytes32" }], "name": "addOrg", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_agencyAddress", "type": "address" }, { "internalType": "bytes32", "name": "_id", "type": "bytes32" }, { "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "uint256", "name": "_balance", "type": "uint256" }, { "internalType": "uint256", "name": "_noOfGrants", "type": "uint256" }, { "internalType": "bytes32", "name": "_infoLink", "type": "bytes32" }], "name": "updateGrantSpent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
async function onInit(randomString, totalBudget) {
  return new Promise(async function (resolve, reject) {
    randomString = "0x" + randomString
    console.log('randomString', randomString)
    console.log(window.ethereum)
    let web3;
    let fromAddress;
    if (window.ethereum) {
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
      const magic = new Magic('pk_live_350FEFDEDF81F26B', { network: customNodeOptions });
      magic.network = 'matic';
      web3 = new Web3(magic.rpcProvider);

      fromAddress = (await web3.eth.getAccounts())[0];
      console.log("fromAddress");
      console.log(fromAddress);
    }
    totalBudget = "0x" + totalBudget
    console.log('after else', totalBudget)
    const celiexContract = new web3.eth.Contract(contractABI, contractAddress)
    console.log('celiexContract', celiexContract)
    celiexContract.methods
      .addGrant(randomString, '0x11111111111111111111111', '0x7Eb0156eF2b1d3545c8684d9eb005207Aaa723B7', totalBudget, '0x7Eb0156eF2b1d3545c8684d9eb005207Aaa723B7', false, '0x1111111')
      .send({ from: fromAddress }, function (err, res) {
        if (err) {
          console.log("An error occurred", err)
          resolve(false)
          return
        }
        resolve(res)
        console.log("Hash of the transaction: " + res)
      })

  })
}
const creategrantUrl = 'https://civitas-api.arhamsoft.org/v1/front/grants/create'
var eligibleEntityTypes = []
const postData = async (obj) => {
  console.log("payload: ", obj);
  console.log("grantUrl", creategrantUrl);
  const token = localStorage.getItem('accessToken');
  console.log('token', token)
  try {
    const response = await fetch(creategrantUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(obj),
    });
    console.log('response', response)
    if (response === undefined) {
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
function generateRandomString() {
  let randomString = '';
  randomString += (Math.floor(100000000000 + Math.random() * 900000000000));
  return randomString;
}
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

  const randomString = generateRandomString() // "ersNAI"
  console.log('getRandom', randomString)
  console.log('totalBudgetValue', totalBudgetValue)
  const txRes = await onInit(randomString, totalBudgetValue);
  console.log('txRes', txRes)
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
    reportingDetails: reportingDetailsValue,
    grantId: randomString,
    txHash: txRes
  };
  console.log("data", data)
  let response = await postData(data);

  if (response && response.code === 500) {
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
    const getGrantId = response.grants._id;
    console.log("getGrantId", getGrantId)
    const totalBudget = response.grants.totalBudget;
    console.log("totalBudget", totalBudget)
    Toastify({
      text: response.message+ " Click here to view the transsaction on chain.",
      duration: 4000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
      onClick: function () { window.open(`${blockChainExplorer}tx/${txRes}`) }
    }).showToast();
  }
  else {
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

const listGrantCategories = async () => {
  const token = localStorage.getItem('accessToken');
  console.log('token', token)
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
    if (response === undefined) {
      message = 'Failed to authenticate token.'
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