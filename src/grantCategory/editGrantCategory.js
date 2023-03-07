const grantCategoryUrl = 'https://civitas-api.arhamsoft.org/v1/admin/grants/category/edit'
var grantCategoryImageValue;
const editgrantCategoryData = async (obj) => {
    console.log("data", obj);
    console.log("grantCategoryUrl", grantCategoryUrl);
    try {
        const response = await fetch(grantCategoryUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const editgrantCategoryType = await response.json();
        console.log("editgrantCategoryType", editgrantCategoryType);
        return editgrantCategoryType;
    } catch (error) {
        return null;
    }
};


const grantCategoryimageInput = document.getElementById('grantCategoryimageInput').addEventListener('change', event => {
    const target = event.target
    console.log('target', target)
    const file = target.files[0]
    console.log('file', file.name)
    grantCategoryImageValue = file.name
    console.log('grantCategoryImageValue', grantCategoryImageValue)
})


const editGrantCategoryButton = (document.getElementById('editGrantCategoryButton').onclick = async function () {
    const grantCategoryNameInput = document.getElementById('grantCategoryNameInput')
    const descriptionInput = document.getElementById('descriptionInput')
    const statusInput = document.getElementById('statusInput')
    const grantCategoryNameValue = grantCategoryNameInput.value
    const descriptionValue = descriptionInput.value
    var statusValue = statusInput.value

    console.log('statusValue', statusValue);
    if (statusValue != 1 && statusValue != 0) {
        console.log('nothing')
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = "Please enter value either 0 or 1";
        return;
    }

    if (statusValue && statusValue == 0) {
        console.log('zero')
        statusValue = !Boolean(statusInput.value)
    }
    if (statusValue && statusValue == 1) {
        console.log('1')
        statusValue = Boolean(statusInput.value)
    }

    console.log(grantCategoryNameValue, statusValue, descriptionValue) // 👉️ "Initial value"
    let data = {
        _id: '6388496b20c9264d5c598192',
        name: grantCategoryNameValue,
        status: statusValue,
        description: descriptionValue,
        image: grantCategoryImageValue
    }
    console.log('type of status', typeof statusValue)
    console.log('edit organization Type data', data)
    let response = await editgrantCategoryData(data)
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
        if (grantCategoryNameValue.value) organizationTypeNameValue.value = ''
        if (statusValue.value) statusValue.value = ''
        if (descriptionValue.value) descriptionValue.value = ''
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
