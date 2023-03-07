let deletegrantCategoryUrl = 'https://civitas-api.arhamsoft.org/v1/admin/grants/category/delete'
const deletegrantCategoryData = async (categoryId) => {
    console.log("categoryId", categoryId);
    deletegrantCategoryUrl = deletegrantCategoryUrl + '/' + categoryId;
    try {
        const response = await fetch(deletegrantCategoryUrl, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const deleteGrantCategoryType = await response.json();
        console.log("deleteGrantCategoryType", deleteGrantCategoryType);
        return deleteGrantCategoryType;
    } catch (error) {
        return null;
    }
};



const deleteGrantCategoryButton = (document.getElementById('deleteGrantCategoryButton').onclick = async function () {
    let response = await deletegrantCategoryData('6388496b20c9264d5c598192')
    if (response && response.success) {
        if (successMessageContainer)
            successMessageContainer.innerHTML = response.message
    } else if (response && !response.success) {
        if (errorMessageContainer)
            errorMessageContainer.innerHTML = response.message
    }
})
