let getgrantCategoryUrl = 'https://civitas-api.arhamsoft.org/v1/admin/grants/category/get'
const getgrantCategoryData = async (categoryId) => {
    console.log("categoryId", categoryId);
    getgrantCategoryUrl = getgrantCategoryUrl + '/' + categoryId;
    try {
        const response = await fetch(getgrantCategoryUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const getGrantCategoryType = await response.json();
        console.log("getGrantCategoryType", getGrantCategoryType);
        return getGrantCategoryType;
    } catch (error) {
        return null;
    }
};



const getGrantCategoryButton = (document.getElementById('getGrantCategoryButton').onclick = async function () {
    let response = await getgrantCategoryData('6388495a20c9264d5c59818e')
    if (response) {
        var data = response.category
        console.log('data', data)
    }
    let arrHead = new Array();
    let createDiv = document.createElement('div')
    createDiv.className = 'grantCategoryData'
    console.log('createDiv', createDiv)
    arrHead = ['description', 'image', 'name','status']; // table headers.
    let empTable = document.createElement('table');
    empTable.className = 'grantCategoryTable'
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
    createBody.className = 'grantCategoryData'
    empTable.append(createBody)
    console.log(empTable)
    createDiv.append(empTable)
    console.log(createDiv)
    let getRow = document.createElement('tr');
    for (let k = 0; k < arrHead.length; k++) {
            let td = document.createElement('td');
             let h = arrHead[k]
            console.log("h", h)
              console.log("data[h]", data[h])
            td.innerText = data[h];
            console.log("td",td)
            getRow.append(td)
          }
          createBody.append(getRow)
    console.log("createBody", createBody)
    if (createDiv) {
        document.getElementById('getGrantCategory').appendChild(createDiv)
    }

    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})