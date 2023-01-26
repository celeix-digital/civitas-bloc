const grantUrl = 'https://civitas-api.herokuapp.com/v1/front/grants/create'
var imageValue
const postData = async (obj) => {
  console.log("payload: ", obj);
  console.log("grantUrl", grantUrl);

  try {
    const response = await fetch(grantUrl, {
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

const userimageInput = document.getElementById('userimageInput').addEventListener('change', event => {
  const target = event.target
  console.log('target', target)
  const file = target.files[0]
  console.log('file', file.name)
  imageValue = file.name
  console.log('imageValue', imageValue)
})
const addInputFields = (document.getElementById('add').onclick = async function () {
  let getInputFields = document.getElementById('inputFields').value;
  if (!getInputFields || getInputFields == 0) {
    return
  }
  console.log('getInputFields', getInputFields)
  let createDiv = document.createElement('div')
  createDiv.id = 'getInputFields'
  for (let i = 0; i < getInputFields; i++) {
    var br = document.createElement("br");
    createDiv.append(br)
    var input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'key'
    createDiv.append(input)
    input = document.createElement('input')
    input.type = 'text'
    input.placeholder = 'value'
    createDiv.append(input)
    br = document.createElement("br");
    createDiv.append(br)
  }
  br = document.createElement("br");
  createDiv.append(br)
  console.log('createDiv', createDiv)
  document.getElementById('listOfInputFields').appendChild(createDiv)
  document.getElementById('add').style.visibility = 'hidden';
})


const createGrantButton = (document.getElementById('createGrantButton').onclick = async function () {
  const grantNameInput = document.getElementById('grantNameInput')
  const executiveSummaryInput = document.getElementById('executiveSummaryInput')
  const eligibilityCriteriaInput = document.getElementById('eligibilityCriteriaInput')
  const submissionDeadlineInput = document.getElementById('submissionDeadlineInput')
  const questionsDeadlineInput = document.getElementById('questionsDeadlineInput')
  const startDate = document.getElementById('startDateInput')
  const endDate = document.getElementById('endDateInput')
  const durationTotal = document.getElementById('durationTotalInput')
  const fundingType = document.getElementById('fundingType')
  const inputFields = document.getElementById('inputFields')
  const opportunityNumber = document.getElementById('opportunityNumber')
  const totalBudgetInput = document.getElementById('totalBudgetInput')
  const maximuAllowanceInput = document.getElementById('maximuAllowanceInput')
  const durationPeriodInput = document.getElementById('durationPeriodInput')
  const organizationId = document.getElementById('organizationId')
  const categories = document.getElementById('categories')
  const tags = document.getElementById('tagsInput')
  const maxBudget = document.getElementById('maxBudgetInput')

  if (inputFields.value > 0) {
    var divElem = document.getElementById("getInputFields");
    console.log('divElem', divElem)
    var inputElements = divElem.querySelectorAll("input");
    console.log('inputElements', inputElements)
    var array = []
    if (inputFields.value !== 1) {
      var length = inputElements.length / 2;
    }
    let k = 0;
    for (let i = 0; i < length; i++) {
      console.log("...", inputElements[k].value)
      let key = inputElements[k].value
      k++;
      console.log("...", inputElements[k].value)
      let value = inputElements[k].value
      k++;
      array.push({ title: key, fieldType: value });
    }
    console.log('array', array)
  }
  const grantNameValue = grantNameInput.value
  const executiveSummaryValue = executiveSummaryInput.value
  const eligibilityCriteriaValue = eligibilityCriteriaInput.value
  let submissionDeadlineValue = submissionDeadlineInput.value
  submissionDeadlineValue = new Date(submissionDeadlineValue);
  let questionsDeadlineValue = questionsDeadlineInput.value
  questionsDeadlineValue = new Date(questionsDeadlineValue);
  let startDateValue = startDate.value
  startDateValue = new Date(startDateValue);
  let endDateValue = endDate.value
  endDateValue = new Date(endDateValue);
  let durationTotalValue = durationTotal.value
  durationTotalValue = parseInt(durationTotalValue)
  let fundingTypeValue = fundingType.value
  if (fundingTypeValue === 'Cooperative Agreement') {
    fundingTypeValue = '0';
    fundingTypeValue = parseInt(fundingTypeValue)
  }
  if (fundingTypeValue === 'Grant') {
    fundingTypeValue = '1';
    fundingTypeValue = parseInt(fundingTypeValue)
  }
  if (fundingTypeValue === 'Other') {
    fundingTypeValue = '2';
    fundingTypeValue = parseInt(fundingTypeValue)
  }
  if (fundingTypeValue === 'Procurement Contract') {
    fundingTypeValue = '3';
    fundingTypeValue = parseInt(fundingTypeValue)
  }
  if (fundingTypeValue === 'CA') {
    fundingTypeValue = '4';
    fundingTypeValue = parseInt(fundingTypeValue)
  }
  if (fundingTypeValue === 'G') {
    fundingTypeValue = '5';
    fundingTypeValue = parseInt(fundingTypeValue)
  }


  let opportunityNumberValue = opportunityNumber.value
  if (opportunityNumberValue === 'Forcasted') {
    opportunityNumberValue = '0';
    opportunityNumberValue = parseInt(opportunityNumberValue)
  }
  if (opportunityNumberValue === 'Posted') {
    opportunityNumberValue = '1';
    opportunityNumberValue = parseInt(opportunityNumberValue)
  }
  if (opportunityNumberValue === 'Closed') {
    opportunityNumberValue = '2';
    opportunityNumberValue = parseInt(opportunityNumberValue)
  }
  if (opportunityNumberValue === 'Archived') {
    opportunityNumberValue = '3';
    opportunityNumberValue = parseInt(opportunityNumberValue)
  }
  let totalBudgetValue = totalBudgetInput.value
  totalBudgetValue = parseInt(totalBudgetValue)
  let maximuAllowanceValue = maximuAllowanceInput.value
  maximuAllowanceValue = parseInt(maximuAllowanceValue)
  let durationPeriodValue = durationPeriodInput.value

  durationPeriodValue = parseInt(durationPeriodValue)
  let organizationIdValue = organizationId.value

  if(organizationIdValue === 'IMF'){
    organizationIdValue = '6358e249c267802df0900e6a'
  }
  if(organizationIdValue === 'Org 2'){
    organizationIdValue = '6374757228887047dce60c85'
  }
  let categoriesValue = categories.value

  if(categoriesValue === 'Grant 1'){
    categoriesValue = '6358d824ed6f82275ce2c1ee'
  }
  if(categoriesValue === 'Grant 2'){
    categoriesValue = '6358d96e4e86982e388367de'
  }
  const tagsValue = tags.value
  let maxBudgetValue = maxBudget.value
  maxBudgetValue = parseInt(maxBudgetValue)
  console.log(grantNameValue, executiveSummaryValue, eligibilityCriteriaValue, submissionDeadlineValue
    , questionsDeadlineValue, startDateValue, endDateValue, durationTotalValue, fundingTypeValue, opportunityNumberValue
    , totalBudgetValue, maximuAllowanceValue, durationPeriodValue, categoriesValue, organizationIdValue, tagsValue, maxBudgetValue, imageValue) // 👉️ "Initial value"
  if (!grantNameValue || !imageValue || !submissionDeadlineValue || !questionsDeadlineValue || !startDateValue
    || !endDateValue || !durationTotal || !maxBudgetValue) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = "Please provide all required values";
    return;
  }
  let data = {
    name: grantNameValue,
    executiveSummary: executiveSummaryValue,
    eligibilityCriteria: eligibilityCriteriaValue,
    image: imageValue,
    submissionDeadline: submissionDeadlineValue,
    questionsDeadline: questionsDeadlineValue,
    startDate: startDateValue,
    endDate: endDateValue,
    durationTotal: durationTotalValue,
    fundingType: fundingTypeValue,
    opportunityNumber: opportunityNumberValue,
    totalBudget: totalBudgetValue,
    maximumAllowance: maximuAllowanceValue,
    durationPeriod: durationPeriodValue,
    organizationId: organizationIdValue,
    categories: categoriesValue,
    tags: tagsValue,
    maxBudget: maxBudgetValue,
    grantCustomFields: array
  }
  console.log('grants data', data)
  let response = await postData(data)
  console.log("response", response)
  if (response && response.success) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message
    if (grantNameValue.value) grantNameValue.value = ''
    if (executiveSummaryValue.value) executiveSummaryValue.value = ''
    if (eligibilityCriteriaValue.value) eligibilityCriteriaValue.value = ''
    if (submissionDeadlineValue.value) submissionDeadlineValue.value = ''
    if (questionsDeadlineValue.value) questionsDeadlineValue.value = ''
    if (startDateValue.value) startDateValue.value = ''
    if (endDateValue.value) endDateValue.value = ''
    if (durationTotalValue.value) durationTotalValue.value = ''
    if (totalBudgetValue.value) totalBudgetValue.value = ''
    if (maximuAllowanceValue.value) maximuAllowanceValue.value = ''
    if (durationPeriodValue.value) durationPeriodValue.value = ''
    if (tagsValue.value) tagsValue.value = ''
    if (maxBudgetValue.value) maxBudgetValue.value = ''
  } else if (response && !response.success) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message
  }
})
