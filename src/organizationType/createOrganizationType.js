const organizationTypeUrl = 'https://civitas-api.herokuapp.com/v1/admin/organizations/type/create'
const postOrganizationTypeData = async (obj) => {
    console.log("data", obj);
    console.log("organizationTypeUrl", organizationTypeUrl);
    try {
        const response = await fetch(organizationTypeUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
        });
        const createOrganizationType = await response.json();
        console.log("createOrganizationType", createOrganizationType);
        return createOrganizationType;
    } catch (error) {
        return null;
    }
};

const createOrganizationTypeButton = (document.getElementById('createOrganizationTypeButton').onclick = async function () {
    const organizationTypeNameInput = document.getElementById('organizationTypeNameInput')
    const statusInput = document.getElementById('statusInput')

    const organizationTypeNameValue = organizationTypeNameInput.value
    var statusValue = statusInput.value

    console.log('statusValue',statusValue)
    if (statusValue == 0) {
        console.log('zero')
         statusValue = !Boolean(statusInput.value)
    }
    else {
        console.log('1')
        statusValue = Boolean(statusInput.value)
    }
    console.log(organizationTypeNameValue, statusValue) // 👉️ "Initial value"
    if (!organizationTypeNameValue) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = "Please provide all required values";
        return;
    }
    let data = {
        name: organizationTypeNameValue,
        status: statusValue,
    }
    console.log('type of status', typeof statusValue)
    console.log('organization Type data', data)
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
