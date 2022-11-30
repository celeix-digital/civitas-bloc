const organizationTypeUrl = 'https://civitas-api.herokuapp.com/v1/admin/organizations/type/edit'
const postOrganizationTypeData = async (obj) => {
    console.log("data", obj);
    console.log("organizationTypeUrl", organizationTypeUrl);
    try {
        const response = await fetch(organizationTypeUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const editOrganizationType = await response.json();
        console.log("editOrganizationType", editOrganizationType);
        return editOrganizationType;
    } catch (error) {
        return null;
    }
};

const editOrganizationTypeButton = (document.getElementById('editOrganizationTypeButton').onclick = async function () {
    const organizationTypeNameInput = document.getElementById('organizationTypeNameInput')
    const statusInput = document.getElementById('statusInput')

    const organizationTypeNameValue = organizationTypeNameInput.value
    var statusValue = statusInput.value

    // console.log('statusValue',statusValue)
    console.log('type of status', typeof statusValue)
    if (statusValue && statusValue == 0) {
        console.log('zero')
         statusValue = !Boolean(statusInput.value)
    }
    if (statusValue && statusValue == 1)  {
        console.log('1')
        statusValue = Boolean(statusInput.value)
    }
    // if(statusValue == ""){
    //     statusValue = "0"
    //     statusValue = !Boolean(statusValue)
    // }
    console.log(organizationTypeNameValue, statusValue) // 👉️ "Initial value"
    let data = {
        _id:'6374e790bfcae50be4800733',
        name: organizationTypeNameValue,
        status: statusValue,
    }
    // console.log('type of status', typeof statusValue)
    console.log('edit organization Type data', data)
    let response = await postOrganizationTypeData(data)
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
        if (organizationTypeNameValue.value) organizationTypeNameValue.value = ''
        if (statusValue.value) statusValue.value = ''
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
