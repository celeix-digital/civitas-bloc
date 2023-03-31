const createGrantUrl = 'https://civitas-api.arhamsoft.org/v1/front/grants/create'
const domainUrl = "https://civitasbloc.webflow.io/"

let web3;
let fromAddress;
let token;
let response;
let grantCategoriesHtml = ''
let message;
let idIndex;
let data;
let eligibilityCheck;
let obj = {}
let eligibilityName;
var eligibleEntityTypes = []
const postData = async (obj) => {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await fetch(createGrantUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });
    console.log('response', response)
    const createGrant = await response.json();
    console.log("createGrant", createGrant);
    return createGrant;
  } catch (error) {
    return null;
  }
};

function getResponse(response) {
  Toastify({
    text: response.message + 'Please go to login page',
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
  window.location.href = `${domainUrl}agency/login`
}
const submitToast = () => {
  Toastify({
    text: "Your form has been submitted. Please wait while your grant is created.",
    duration: 3000,
    close: true,
    style: {
      background: "#416ab3",
    },
    onClick: function () { }
  }).showToast();
}
const checkResponse = (message, backgroundcolor) => {
  Toastify({
    text: message,
    duration: 4000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: `${backgroundcolor}`,
    },
    onClick: function () {
    }
  }).showToast();
}
const submitReview = async () => {
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

  if (!grantNameValue || !totalBudgetValue || !awardCeilingValue || !awardFloorValue) {
    checkResponse("Please fill all the fields", "red")
    return;
  }
  data = {
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
  };
  console.log("data", data)
  submitToast()
  let response = await postData(data);
  if (response && response.code === 500) {
    localStorage.removeItem('accessToken')
    getResponse(response)
  }
  if (response && response.success) {
    checkResponse(response.message, backgroundcolor = "linear-gradient(to right, #00b09b, #96c93d)")
    if (grantNameInput.value) grantNameInput.value = "";
    if (opportunityNumberInput.value) opportunityNumberInput.value = "";
    if (grantCategoryInput.value) grantCategoryInput.value = "";
    if (opportunitySummaryInput.value) opportunitySummaryInput.value = "";
    if (totalBudgetInput.value) totalBudgetInput.value = "";
    if (awardCeilingInput.value) awardCeilingInput.value = "";
    if (awardFloorInput.value) awardFloorInput.value = "";
    if (reportingDetailsInput.value) reportingDetailsInput.value = "";
    if (eligibleDetailsInput.value) eligibleDetailsInput.value = ""
  }
  else {
    checkResponse(response.message, "red")
  }
}
const listGrantCategories = async () => {
  console.log('token', token)
  try {
    let response = await fetch('https://civitas-api.arhamsoft.org/v1/front/grants/list-active-categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    console.log('response', response)
    const getResponse = await response.json();
    return getResponse
  } catch (err) {
  }
}
window.onload = async function () {
  token = localStorage.getItem('accessToken')
  const response = await listGrantCategories()
  console.log('window.onload response', response)
  if (response && response.status === false) {
    localStorage.removeItem('accessToken')
    getResponse(response)
  }
  data = response.activeCategoryTypes;
  console.log("list grant categories", data);
  grantCategoriesHtml += `<select id="oppCategory" name="oppCategory" data-name="oppCategory" class="form-input is-select-input w-select">`
    + `<option>Select one...</option>`
  data.forEach(grantCategories => {
    grantCategoriesHtml +=
      `<option value=${grantCategories._id}>` + grantCategories.name + `</option>`;
  });
  grantCategoriesHtml += `</select>`;
  document.getElementsByClassName('form-field-wrapper')[2].innerHTML = grantCategoriesHtml;
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
    // const obj = {}
    let getNUmber = MaptoNumber(name)
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
    eligibilityName = event.target.name;
    let eligibilityCheck = isExsist(eligibilityName)
    if (eligibilityCheck.bool) {
      for (let key in eligibleEntityTypes) {
        if (eligibleEntityTypes[key] == eligibilityCheck.Number) {
          idIndex = eligibleEntityTypes.indexOf(eligibilityCheck.Number);
          eligibleEntityTypes.splice(idIndex, 1);
        }
      }
    }
    else {
      eligibleEntityTypes.push(eligibilityCheck.Number)
    }
    console.log("eligibleEntityTypes", eligibleEntityTypes)
  })
  const submitReviewButton = document.getElementById("w-node-_5a442b79-7394-7141-13fc-32e9051ae335-669865ff");
  submitReviewButton.addEventListener("click", submitReview);
}