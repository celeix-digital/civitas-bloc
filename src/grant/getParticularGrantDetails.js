let url = 'https://civitas-api.arhamsoft.org/v1/front/grants/get'
const getParticularGrant = async id => {
    console.log('id', id)
    console.log('url', url)
    url = url + '/' + id
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


const getParticularGrantButton = (document.getElementById('getParticularGrantButton').onclick = async function () {
    let id = "63738baf7ad17b0016417f49";
    console.log("id", id);
    let response = await getParticularGrant(id)
    console.log("response",response)
    if (response) {
        var data = response.grantDetail[0]
        console.log('data', data)
    }
    let arrHead = new Array();
    let createDiv = document.createElement('div')
    createDiv.className = 'getData'
    console.log('createDiv', createDiv)
    arrHead = ['grantCustomFields', 'published', 'name', 'executiveSummary', 'eligibilityCriteria', 'submissionDeadline',
        'questionsDeadline', 'startDate','durationTotal', 'maxBudget', 'endDate', 'image', 'rfaNo', 'grantName', 'websiteAboutOrganization',
         'serviceProvided', 'walletAddress', 'logo','categoryName', 'categoryDescription', 'categoryImage'];
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
    var getRow = document.createElement('tr');
    for (let j = 0; j < arrHead.length; j++) {
        let td = document.createElement('td');
        let h = arrHead[j]
        console.log("data[h]: ",data[h])
        td.innerText = data[h];
        getRow.append(td)
    }
    console.log("getRow", getRow)
    createBody.append(getRow)
    console.log("createBody", createBody)
    if (createDiv) {
        document.getElementById('listOfGrant').appendChild(createDiv)
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
