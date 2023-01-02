let getOrganizationTypeUrl = 'https://civitas-api.herokuapp.com/v1/admin/organizations/type/get'
const getOrganizationTypeData = async (typeId) => {
    console.log("name", typeId);
    getOrganizationTypeUrl = getOrganizationTypeUrl + '/' + typeId;
    console.log("getOrganizationTypeIdUrl", getOrganizationTypeUrl);
    try {
        const response = await fetch(getOrganizationTypeUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const getOrganizationType = await response.json();
        console.log("getOrganizationType", getOrganizationType);
        return getOrganizationType;
    } catch (error) {
        return null;
    }
};

const getOrganizationTypeButton = (document.getElementById('getOrganizationTypeButton').onclick = async function () {
    let response = await getOrganizationTypeData('6374e790bfcae50be4800733')
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
