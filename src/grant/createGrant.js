const creategrantUrl = 'https://civitas-api.herokuapp.com/v1/front/grants/create'
var eligibleEntityTypes = []


const postData = async (obj) => {
  console.log("payload: ", obj);
  console.log("grantUrl", creategrantUrl);

  try {
    const response = await fetch(creategrantUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const createGrant = await response.json();
    console.log("createGrant", createGrant);
    return createGrant;
  } catch (error) {
    return null;
  }
};


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
  console.log(grantNameValue, opportunityNumberValue, grantCategoryValue, opportunitySummaryValue,eligibleEntityValues,eligibleDetailsValue
    ,totalBudgetValue,awardCeilingValue,awardFloorValue,fundingTypeValue,reportingDetailsValue);// 👉️ "Initial value"
  let data = {
    name: grantNameValue,
    opportunityNumber: Number(opportunityNumberValue),
    categories:grantCategoryValue,
    executiveSummary:opportunitySummaryValue,
    eligibleEntityTypes:eligibleEntityValues,
    eligibilityCriteria:eligibleDetailsValue,
    totalBudget:Number(totalBudgetValue),
    awardCeiling:Number(awardCeilingValue),
    awardFloor:Number(awardFloorValue),
    fundingType:Number(fundingTypeValue),
    reportingDetails:reportingDetailsValue
  };
  console.log("data", data)
    let response = await postData(data);
   console.log("response", response)
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
  try {
    const response = await fetch('https://civitas-api.herokuapp.com/v1/front/grants/list-active-categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    })
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
    if (eligibleEntityTypes.includes(getNUmber) ){
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
      console.log("check true",check)
      for(let key in eligibleEntityTypes){
        if(eligibleEntityTypes[key] == check.Number ){
          idIndex = eligibleEntityTypes.indexOf(check.Number);
          eligibleEntityTypes.splice(idIndex, 1);
        }
      }
      console.log("eligibleEntityTypes",eligibleEntityTypes)
    }
    else {
      console.log("check false",check)
      eligibleEntityTypes.push(check.Number)
      console.log("eligibleEntityTypes",eligibleEntityTypes)
    }
  })
  const submitReviewButton = document.getElementById("w-node-_5a442b79-7394-7141-13fc-32e9051ae335-669865ff");
  console.log("submitReviewButton",submitReviewButton)
  submitReviewButton.addEventListener("click", submitReview);
}