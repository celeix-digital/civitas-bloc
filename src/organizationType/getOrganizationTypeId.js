let deleteOrganizationTypeIdUrl = 'https://civitas-api.herokuapp.com/v1/admin/organizations/type/delete'
const getOrganizationTypeIdData = async (typeId) => {
    console.log("typeId", typeId);
    deleteOrganizationTypeIdUrl = deleteOrganizationTypeIdUrl + '/' + typeId;
    console.log("deleteOrganizationTypeIdUrl", deleteOrganizationTypeIdUrl);
    try {
        const response = await fetch(deleteOrganizationTypeIdUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const deleteOrganizationTypeId = await response.json();
        console.log("deleteOrganizationTypeId", deleteOrganizationTypeId);
        return getOrganizationTypeId;
    } catch (error) {
        return null;
    }
};

const deleteOrganizationTypeIdButton = (document.getElementById('deleteOrganizationTypeIdButton').onclick = async function () {
    let response = await getOrganizationTypeIdData('6387382cc682e33e14324423')
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
