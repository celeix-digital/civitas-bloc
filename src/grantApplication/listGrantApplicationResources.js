let url = 'https://civitas-api.arhamsoft.org/v1/front/grant-application/get-application-resources'
const getGrantApplicationResources = async id => {
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

const getGrantApplicationResourcesButton = (document.getElementById('getGrantApplicationResourcesButton').onclick = async function () {
    let id = "6385d65f9f002353282e559b";
    console.log("id", id);
    let response = await getGrantApplicationResources(id)
    console.log("response", response)
    if (response) {
        var data = response.grantApplicationResources
        console.log('data', data)
    }
    let arrHead = new Array();
    let createDiv = document.createElement('div')
    createDiv.className = 'grantResourcesData'
    console.log('createDiv', createDiv)
    arrHead = ['file', 'type', 'status', 'grantApplicationId'];
    let empTable = document.createElement('table');
    empTable.className = 'grantResourcesTable'
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
    createBody.className = 'grantResourcesData'
    empTable.append(createBody)
    console.log(empTable)
    createDiv.append(empTable)
    console.log(createDiv)
    const h = Object.keys(data).length;
    console.log('length',h)
    for (let j = 0; j < Object.keys(data).length; j++) {
        let getRow = document.createElement('tr');
         for (let k = 0; k < arrHead.length; k++) {
            let td = document.createElement('td');
            let h = arrHead[k]
            console.log("h", h)
            console.log("data[j][h]", data[j][h])
            td.innerText = data[j][h];
            console.log("td",td)
            getRow.append(td)
         }
         createBody.append(getRow)
         console.log("createBody..",j, getRow)
    }
    // console.log("getResourcesRow", getRow)
    // createBody.append(getRow)
    console.log("createBody", createBody)
    if (createDiv) {
        document.getElementById('getGrantApplicationsResources').appendChild(createDiv)
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
