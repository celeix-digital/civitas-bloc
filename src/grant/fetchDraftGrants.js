let url = 'https://civitas-api.herokuapp.com/v1/front/grants/get-draft-grants'
const getdraftGrant = async obj => {
    console.log('url', url)
    try {
        const response = await fetch(url, {
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
        return response
    } catch (error) {
        return null
    }
}


const fetchDraftGrantButton = (document.getElementById('fetchDraftGrantButton').onclick = async function () {
    let response = await getdraftGrant()
    console.log("response",response)
    if (response) {
        var data = response.fetchDraftGrants
        console.log('data', data)
    }
    let arrHead = new Array();
    let createDiv = document.createElement('div')
    createDiv.className = 'getData'
    console.log('createDiv', createDiv)
    arrHead = ['name', 'rfaNo', 'executiveSummary', 'eligibilityCriteria','image','submissionDeadline','questionsDeadline','startDate'
    ,'endDate','durationTotal','published','fundingType','opportunityNumber','totalBudget','maximumAllowance','durationPeriod','organizationId','categories'
  ,'tags','maxBudget'];
    let empTable = document.createElement('table');
    empTable.className = 'grantTable'
    let thead = document.createElement('thead');
    let createRow = document.createElement('tr');
    arrHead.forEach(header => {
        let createHeader = document.createElement('th');
        createHeader.innerText = header;
        createRow.append(createHeader)
    })
    thead.append(createRow)
    empTable.append(thead)
    let createBody = document.createElement('tbody');
    createBody.className = 'grantData'
    empTable.append(createBody)
    console.log(empTable)
    createDiv.append(empTable)
    console.log(createDiv)
    if(data){
        for (let i = 0; i < data.length; i++) {
           var getRow = document.createElement('tr'); // the header object.
          for(let j = 0 ; j < arrHead.length ; j++){
            let td = document.createElement('td'); 
            let h = arrHead[j]
            console.log(data[i][h])
            td.innerText = data[i][h];
            getRow.append(td)
          }
          console.log("getRow",getRow)
          createBody.append(getRow)
          console.log("createDiv",createDiv)
          if(createDiv){
            document.getElementById('fetchDraftGrant').appendChild(createDiv)
          }
        }
      }
    console.log('response', response)
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
