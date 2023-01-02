let url = 'https://civitas-api.herokuapp.com/v1/front/grant-application/get'
const getParticularGrantApplication = async id => {
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
const getGrantApplicationButton = (document.getElementById('getGrantApplicationButton').onclick = async function () {
    let id = "6385d67d9f002353282e55a1";
    console.log("id", id);
    let response = await getParticularGrantApplication(id)
    console.log("response", response)
    if (response) {
        var data = response.grantApplicationDetail[0]
        console.log('data', data)
    }
    let arrHead = new Array();
    let createDiv = document.createElement('div')
    createDiv.className = 'getData'
    console.log('createDiv', createDiv)
    arrHead = ['applicantId', 'applicationCustomFields', 'applicationNumber', 'approvalAmount', 'coverLetter', 'categories',
        'draftPublish', 'durationTotal', 'eligibilityCriteria', 'endDate', 'executiveSummary', 'grantCustomFields', 'image', 'maxBudget',
        'name', 'organizationId', 'published', 'questionsDeadline', 'rfaNo', 'startDate', 'submissionDeadline', 'tags',
        '_id', 'grantApproved', 'grantDispatched', 'grantId', 'logo', 'name', 'organizationCode', 'serviceProvided',
        'type', 'walletAddress', 'websiteAboutOrganization', 'zip', '_id', 'organizationId', 'status', 'accessToken',
        'email', 'emailVerified', 'image', 'name', 'password',
        'wallet', '_id', '_id', 'message'];
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
    const getGrantData = data.grant;
    console.log('getGrantData', getGrantData)
    const getOrganizationData = data.organization;
    console.log('getOrganizationData', getOrganizationData)
    const getUserData = data.user;
    console.log('getUserData', getUserData)
    if (getGrantData) {
        for (let key in getGrantData) {
            let td = document.createElement('td');
            console.log(key)
            for (let j = 0; j < arrHead.length; j++) {
                if (key == arrHead[j]) {
                    console.log(getGrantData[key])
                    td.innerText = getGrantData[key];
                    getRow.append(td)
                    break;
                }
            }
        }
    }
    console.log("getGrantRow", getRow)
    createBody.append(getRow)
    getRow = document.createElement('tr');
    if (getOrganizationData) {
        for (let key in getOrganizationData) {
            let td = document.createElement('td');
            console.log(key)
            for (let j = 0; j < arrHead.length; j++) {
                if (key == arrHead[j]) {
                    console.log(getOrganizationData[key])
                    td.innerText = getOrganizationData[key];
                    getRow.append(td)
                    break;
                }
            }
        }
    }
    console.log("getOrganizationRow", getRow)
    createBody.append(getRow)
    getRow = document.createElement('tr');
    if (getUserData) {
        for (let key in getUserData) {
            let td = document.createElement('td');
            console.log(key)
            for (let j = 0; j < arrHead.length; j++) {
                if (key == arrHead[j]) {
                    console.log(getUserData[key])
                    td.innerText = getUserData[key];
                    getRow.append(td)
                    break;
                }
            }
        }
    }
    console.log("getUserrow", getRow)
    createBody.append(getRow)
    if (createDiv) {
        document.getElementById('getGrantApplications').appendChild(createDiv)
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
