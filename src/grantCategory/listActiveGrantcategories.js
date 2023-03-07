const listActiveGrantCategoryUrl = 'https://civitas-api.arhamsoft.org/v1/front/grants/list-active-categories'
const listActiveGrantCategoriesData = async obj => {
    console.log('listActiveGrantCategoryUrl', listActiveGrantCategoryUrl)
    try {
        const response = await fetch(listActiveGrantCategoryUrl ,{
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
const listActiveGrantCategoriesButton = (document.getElementById(
    'listActiveGrantCategoriesButton'
).onclick = async function () {
    let response = await listActiveGrantCategoriesData()
    console.log('response', response)
    if (response) {
        var data = response.activeCategoryTypes
        console.log('data', data)
    }
    let arrHead = new Array();
    let createDiv = document.createElement('div')
    createDiv.className = 'listActiveGrantCategoryData'
    console.log('createDiv', createDiv)
    arrHead = ['_id','description', 'image', 'name','status']; // table headers.
    let empTable = document.createElement('table');
    empTable.className = 'listActiveGrantCategoryTable'
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
    createBody.className = 'listActiveGrantCategoryData'
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
        document.getElementById('listActiveGrantCategories').appendChild(createDiv)
    }
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
