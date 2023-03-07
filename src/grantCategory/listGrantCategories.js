const listGrantCategoryUrl = 'https://civitas-api.arhamsoft.org/v1/admin/grants/category/list'
const listGetCategoriesData = async obj => {
    console.log('listGrantCategoryUrl', listGrantCategoryUrl)
    try {
        const response = await fetch(listGrantCategoryUrl ,{
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
const listGrantCategoriesButton = (document.getElementById(
    'listGrantCategoriesButton'
).onclick = async function () {
    let response = await listGetCategoriesData()
    console.log('response', response)
    if (response) {
        var data = response.data.categories
        console.log('data', data)
    }
    let arrHead = new Array();
    let createDiv = document.createElement('div')
    createDiv.className = 'listGrantCategoryData'
    console.log('createDiv', createDiv)
    arrHead = ['_id','description', 'image', 'name','status']; // table headers.
    let empTable = document.createElement('table');
    empTable.className = 'listGrantCategoryTable'
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
    createBody.className = 'listGrantCategoryData'
    empTable.append(createBody)
    console.log(empTable)
    createDiv.append(empTable)
    console.log(createDiv)
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
        document.getElementById('listGrantCategories').appendChild(createDiv)
    }
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
