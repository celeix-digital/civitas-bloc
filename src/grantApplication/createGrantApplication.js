const grantApplicationUrl = 'http://localhost:8080/v1/front/grant-application/create'
var files;
var arrayUrl
const postData = async (obj) => {
    console.log("payload: ", obj);
    console.log("grantApplicationUrl", grantApplicationUrl);
    try {
        const response = await fetch(grantApplicationUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const createGrantApplication = await response.json();
        console.log("createGrantApplication", createGrantApplication);
        return createGrantApplication;
    } catch (error) {
        return null;
    }
};


const grantimageInput = document.getElementById('grantimageInput').addEventListener('change', event => {
    // const target = event.target.files;
    // files = Array.from(event.target.files)
    // console.log('files', files)
    files = event.target.files;
    console.log('files', files)
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

const createGrantApplicationButton = (document.getElementById('createGrantApplicationButton').onclick = async function () {
    const grantId = document.getElementById('grantId')
    const applicantId = document.getElementById('applicantId')
    const organizationId = document.getElementById('organizationId')
    const approvalAmountInput = document.getElementById('approvalAmountInput')
    const applicationNumberInput = document.getElementById('applicationNumberInput')
    const coverLetterInput = document.getElementById('coverLetterInput')
    const grantDispatchedInput = document.getElementById('grantDispatchedInput')
    const grantApprovedInput = document.getElementById('grantApprovedInput')
    const statusInput = document.getElementById('statusInput')
    const inputFields = document.getElementById('inputFields')


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

    let grantIdValue = grantId.value
    if (grantIdValue === 'Grant 1') {
        grantIdValue = '6371d0a63b839e54040199eb'
    }
    if (grantIdValue === 'Grant 2') {
        grantIdValue = '6372324c035d055e687abbe2'
    }
    if (grantIdValue === 'grant1') {
        grantIdValue = '637dead1fe3d8a0bc452c3ce'
    }
    if (grantIdValue === 'Grant 3') {
        grantIdValue = '637df521fe3d8a0bc452c3db'
    }
    if (grantIdValue === 'ADSFFG') {
        grantIdValue = '637e20bc310e362734d37ffe'
    }

    let applicantIdValue = applicantId.value
    if (applicantIdValue === 'zainabbas') {
        applicantIdValue = '63760952d675263e3c65bc6a'
    }


    let organizationIdValue = organizationId.value
    if (organizationIdValue === 'IMF') {
        organizationIdValue = '6358e249c267802df0900e6a'
    }
    if (organizationIdValue === 'Org 2') {
        organizationIdValue = '6374757228887047dce60c85'
    }


    let approvalAmountValue = approvalAmountInput.value
    approvalAmountValue = parseInt(approvalAmountValue)
    let coverLetterValue = coverLetterInput.value
    let applicationNumberValue = applicationNumberInput.value
    let grantDispatchedValue = grantDispatchedInput.value
    grantDispatchedValue = parseInt(grantDispatchedValue)
    let grantApprovedValue = grantApprovedInput.value
    grantApprovedValue = parseInt(grantApprovedValue)
    let statusValue = statusInput.value
    statusValue = parseInt(statusValue)


    console.log(grantIdValue, applicantIdValue, organizationIdValue, approvalAmountValue
        , coverLetterValue, applicationNumberValue, grantDispatchedValue, grantApprovedValue, statusValue, files) // 👉️ "Initial value"
    if (!approvalAmountValue) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = "Please provide all required values";
        return;
    }
    let data = {
        grantId: grantIdValue,
        applicantId: applicantIdValue,
        organizationId: organizationIdValue,
        approvalAmount: approvalAmountValue,
        applicationNumber: applicationNumberValue,
        coverLetter: coverLetterValue,
        grantDispatched: grantDispatchedValue,
        grantApproved: grantApprovedValue,
        status: statusValue,
        applicationCustomFields: array,
        resources: files
    }
    console.log('grant application data', data)
    let response = await postData(data)
    console.log("response", response)
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
        if (approvalAmountValue.value) approvalAmountValue.value = ''
        if (applicationNumberValue.value) applicationNumberValue.value = ''
        if (coverLetterValue.value) coverLetterValue.value = ''
        if (grantDispatchedValue.value) grantDispatchedValue.value = ''
        if (grantApprovedValue.value) grantApprovedValue.value = ''
        if (statusValue.value) statusValue.value = ''
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
