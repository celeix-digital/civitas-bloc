
var getArrayCategory = []
function getInputField() {
  const inputValue = document.getElementById("field-3").value;
  console.log("inputValue", inputValue)
  listGrantData(inputValue)
}

const listGrantData = async (inputValue) => {
  console.log("filterValue function", getArrayCategory)
  try {
    console.log("inputValue", inputValue)
    const response = await fetch('https://civitas-api.herokuapp.com/v1/front/grants/list?' + new URLSearchParams({
      name: inputValue,
      categories: getArrayCategory.length ? JSON.stringify(getArrayCategory) : '',
    }).toString() , {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    let data = response.data.grants;
    console.log("list grant", data);

    let grantsHtml = '';
    data.forEach(grant => {
      grantsHtml += `<div id="w-node-_2277fbd9-a714-5afe-0f89-998ad7055eec-84763b17" role="listitem" class="grant-search_grant-item w-dyn-item">
    <div id="w-node-_5ef5f7b8-2a38-9972-128d-0deb760e5c0d-84763b17" class="grant-search_grant-item-info">
      <h3 id="grant-title" data-element="grant-title" class="agency-dashboard_lef-nav">${grant.name}</h3>
      <div class="grant-search_grant-rfa-wrapper">
        <div class="grant-search_grant-rfa">${grant.rfaNo}</div>
        <div id="grant-opportunity" data-element="rfaNumber" class="grant-search_grant-rfa is-number">${grant.opportunityNumber}</div>
      </div>
      <div class="grant-search_item-tags-wrapper">
        <div fs-cmsfilter-element="grant-filter" class="grant-tag">
          <div fs-cmsfilter-element="tag-text">Filter</div>
        </div>
      </div>
    </div>
    <p id="grant-summary" data-element="grant-summary" class="w-node-ded469c8-20ef-1dc1-7199-7b8f0caf23aa-84763b17">${grant.executiveSummary}</p><a data-element="grant-id" id="w-node-a2548560-e289-b51e-567d-adf944cab13b-84763b17" href="/organization/find-grants/grant-template" class="is-link is-icon w-inline-block">
      <div class="text-block-2">View Grant</div>
      <div class="icon-embed-xsmall w-embed"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--carbon" width="currentWidth" height="currentHeight" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
          <path fill="currentColor" d="m18 6l-1.43 1.393L24.15 15H4v2h20.15l-7.58 7.573L18 26l10-10L18 6z"></path>
        </svg></div>
    </a>
    <div id="w-node-_34cac958-d532-ee8f-deb6-f6c23917279d-84763b17">Budget: $<span id="grant-budget" data-element="grant-budget">${grant.maxBudget}</span></div>
  </div>`
    });
    console.log(document.getElementsByClassName('w-dyn-items'))
    console.log(document.getElementsByClassName('w-dyn-items')[0])
    document.getElementsByClassName('w-dyn-items')[0].innerHTML = grantsHtml;
  } catch (err) {
    console.log(err)
  }
}

const listGrantCategories = async () => {
  try {
    const response = await fetch('https://civitas-api.herokuapp.com/v1/front/grants/list-active-categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    let data = response.activeCategoryTypes;
    console.log("list grant categories", data);
    let grantsCategoriesHtml = '';
    data.forEach(grantCategory => {
      grantsCategoriesHtml += `<div class="grant-search_list">
      <div category-name=${grantCategory.name} class="grant-search_item"><label category-name=${grantCategory.name} id=${grantCategory._id} class="w-checkbox grant-search_form-checkbox1">
          <div class="w-checkbox-input w-checkbox-input--inputType-custom grant-search_form-checkbox1-icon"></div><input type="checkbox" id="Filter-One-Option-1" name="Filter-One-Option-1" data-name="Filter One Option 1" style="opacity:0;position:absolute;z-index:-1"><span fs-cmsfilter-field="IDENTIFIER" class="grant-search_form-checkbox1-label w-form-label" for="Filter-One-Option-1">${grantCategory.name}</span>
        </label></div>
    </div>`
    });
    console.log(document.getElementsByClassName('grant-search_list-wrapper')[4])
    document.getElementsByClassName('grant-search_list-wrapper')[4].innerHTML = grantsCategoriesHtml;
  } catch (err) {
    console.log(err)
  }
}


window.onload = function () {
  listGrantCategories()
  listGrantData("")
  function isExsist(CategoryId){
    if(getArrayCategory.includes(CategoryId))
      return true
      else 
      return false
  }
  const categorySearchList = document.getElementsByClassName("grant-search_list-wrapper")[4];
  console.log("categorySearchList", categorySearchList)
  categorySearchList.addEventListener('change', async (event) => {
    console.log("event dispatched", event)
    const getCategoryId = event.target.parentElement.id;
    console.log("event id",getCategoryId)
    let check =  isExsist(getCategoryId)
    if(check){
      var idIndex = getArrayCategory.indexOf(getCategoryId);
      getArrayCategory.splice(idIndex, 1);
       listGrantData("")
     }
     else{
        getArrayCategory.push(getCategoryId)
         listGrantData("")
     }
     console.log("getArrayCategory",getArrayCategory)
  })

  document.getElementById("field-3").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      getInputField();
    }
  })
}