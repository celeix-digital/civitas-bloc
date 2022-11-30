const url = 'https://civitas-api.herokuapp.com/v1/front/grant-application/list?'
const listGrantApplicationsData = async obj => {
    console.log('url', url)
    try {
        const response = await fetch(url + new URLSearchParams({
            applicantId: '63760952d675263e3c65bc6a',
            organizationId: '6358e249c267802df0900e6a',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })).then(response => {
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
const listGrantApplicationButton = (document.getElementById(
    'listGrantApplicationButton'
).onclick = async function () {
    let response = await listGrantApplicationsData()
    console.log('response', response)
    if (response) {
        var data = response.data.grantApplication
        console.log('data', data)
    }
    let arrHead = new Array();
    let createDiv = document.createElement('div')
    createDiv.className = 'grantApplicationData'
    console.log('createDiv', createDiv)
    arrHead = ['grantId', 'applicantId', 'organizationId', 'applicationCustomFields', 'approvalAmount', 'applicationNumber', 'coverLetter', 'grantDispatched'
        , 'grantApproved', 'status', 'type', 'grantApplicationId', 'file', 'status', 'resources']; // table headers.
    let empTable = document.createElement('table');
    empTable.className = 'grantApplicationTable'
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
    createBody.className = 'grantApplicationData'
    empTable.append(createBody)
    console.log(empTable)
    createDiv.append(empTable)
    console.log(createDiv)
    if (data) {
        for (let i = 0; i < data.length; i++) {
            var getRow = document.createElement('tr'); // the header object.
            for (let j = 0; j < arrHead.length; j++) {
                let td = document.createElement('td');
                let h = arrHead[j]
                console.log(data[i][h])
                td.innerText = data[i][h];
                getRow.append(td)
            }
            console.log("getRow", getRow)
            createBody.append(getRow)
            console.log("createDiv", createDiv)
            if (createDiv) {
                document.getElementById('listOfGrantApplications').appendChild(createDiv)
            }
        }
    }
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
