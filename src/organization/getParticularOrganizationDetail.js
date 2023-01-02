let url = 'https://civitas-api.herokuapp.com/v1/front/organizations/get'
const getParticularOrganization = async id => {
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


const getParticularOrganizationButton = (document.getElementById(
    'getParticularOrganizationButton'
).onclick = async function () {
    let id = "6358e249c267802df0900e6a";
    console.log("id", id);
    let response = await getParticularOrganization(id)
    if (response.organizationDetail) {
        var data = response.organizationDetail[0]
        console.log('data', data)
    }
    let arrHead = new Array();
    let createDiv = document.createElement('div')
    createDiv.className = 'getData'
    console.log('createDiv', createDiv)
    arrHead = ['name', 'type', 'logo', 'websiteAboutOrganization', 'serviceProvided', 'walletAddress', 'city','organizationTypeName','status']; // table headers.
    let empTable = document.createElement('table');
    empTable.className = 'organizationTable'
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
    createBody.className = 'organizationData'
    empTable.append(createBody)
    console.log(empTable)
    createDiv.append(empTable)
    console.log(createDiv)

    var getRow = document.createElement('tr'); // the header object.
    for (let j = 0; j < arrHead.length; j++) {
        let td = document.createElement('td');
        let h = arrHead[j]
        // const bool = checkAttribute(data, h, arrHead);
        //   console.log("bool", bool)
            console.log(data[h])
            td.innerText = data[h];
            getRow.append(td)

    }
    console.log("getRow", getRow)
    createBody.append(getRow)
    console.log("createBody", createBody)
    //    console.log("createDiv",createDiv)
    if (createDiv) {
        document.getElementById('listOfOrganization').appendChild(createDiv)
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
