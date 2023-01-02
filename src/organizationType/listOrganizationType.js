const url = 'https://civitas-api.herokuapp.com/v1/admin/organizations/type/list'
const listOrganizationTypeData = async obj => {
    console.log('url', url)
    try {
        const response = await fetch(url ,{
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
const listOrganizationTypeButton = (document.getElementById(
    'listOrganizationTypeButton'
).onclick = async function () {
    let response = await listOrganizationTypeData()
    console.log('response', response)
    if (response) {
        var data = response.data.organizationTypes
        console.log('data', data)
    }
    let arrHead = new Array();
    let createDiv = document.createElement('div')
    createDiv.className = 'organizationTypeData'
    console.log('createDiv', createDiv)
    arrHead = ['_id', 'status', 'name']; // table headers.
    let empTable = document.createElement('table');
    empTable.className = 'organizationTypeTable'
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
    createBody.className = 'organizationTypeData'
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
    console.log("createBody", createBody)
    if (createDiv) {
        document.getElementById('listOrganizationType').appendChild(createDiv)
    }
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
