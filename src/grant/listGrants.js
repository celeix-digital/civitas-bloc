let getArrayCategory = []
let token;
let message;
let response;
let isLoading = false;
let grantsCategoriesHtml = '';
let inputValue = "";
let grantsHtml = "";
let page = 1;
function getInputField() {
  inputValue = document.getElementById("field-3").value;
  listGrantData()
}
const renderGrants = (response) => {
  let data = response.data.grants;
  console.log("list grant data", data);
  // if (Object.keys(data).length > 0) {
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
      <div id="w-node-_34cac958-d532-ee8f-deb6-f6c23917279d-84763b17">Budget: $<span id="grant-budget" data-element="grant-budget">${grant.totalBudget}</span></div>
    </div>`
    });
    document.getElementsByClassName('w-dyn-items')[0].innerHTML = grantsHtml;
    isLoading = false;
    // console.log(' if  grants')
    // document.getElementsByClassName('grant-search_empty')[0].style.display = 'none'
  // }
  // else {
    // console.log('else grants')
    if (Object.keys(data).length > 0) {
    console.log('document.getElementsByClassName(grant-search_empty', document.getElementsByClassName('grant-search_empty')[0])
    // document.getElementsByClassName('w-dyn-items')[0].innerHTML = document.getElementsByClassName('grant-search_empty')[0]
    document.getElementsByClassName('grant-search_empty')[0].style.display = 'block'
   }

}
const listGrantData = async () => {
  console.log('grantsHtml', grantsHtml)
  try {
    response = await fetch('https://civitas-api.arhamsoft.org/v1/front/grants/list?' + new URLSearchParams({
      name: inputValue,
      page: page,
      categories: getArrayCategory.length ? JSON.stringify(getArrayCategory) : '',
    }).toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    console.log('response list grant data', response)
    if (response && response.status === false) {
      localStorage.removeItem('accessToken')
      getResponse(response)
      return;
    }
    response = await response.json();
    renderGrants(response)
    return response
  } catch (err) {
  }
}
function redirectPage(message) {
  Toastify({
    text: message,
    duration: 4000,
    close: true,
    style: {
      background: "#FF7002",
    },
    onClick: function () { }
  }).showToast();
  window.location.replace("https://civitasbloc.webflow.io/agency/login");
  return
}
const listGrantCategories = async () => {
  try {
    response = await fetch('https://civitas-api.arhamsoft.org/v1/front/grants/list-active-categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    response = await response.json();
    console.log("response", response);
    return response;
  } catch (err) {
    console.log('catch err', err)
  }
}
function loadMore() {
  console.log('load More')
  console.log('isLoading', isLoading)
  if (!isLoading) {
    isLoading = true;
    page++;
    listGrantData()
  }
}
function getResponse(response) {
  Toastify({
    text: response.message + 'Please go to login page',
    duration: 4000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "red",
    },
    onClick: function () { }
  }).showToast();
  window.location.href = `${domainUrl}organization/login`
}
const renderCategories = (response) => {
  let data = response.activeCategoryTypes;
  data.forEach(grantCategory => {
    grantsCategoriesHtml += `<div class="grant-search_list">
    <div category-name=${grantCategory.name} class="grant-search_item"><label category-name=${grantCategory.name} id=${grantCategory._id} class="w-checkbox grant-search_form-checkbox1">
        <div class="w-checkbox-input w-checkbox-input--inputType-custom grant-search_form-checkbox1-icon"></div><input type="checkbox" id="Filter-One-Option-1" name="Filter-One-Option-1" data-name="Filter One Option 1" style="opacity:0;position:absolute;z-index:-1"><span fs-cmsfilter-field="IDENTIFIER" class="grant-search_form-checkbox1-label w-form-label" for="Filter-One-Option-1">${grantCategory.name}</span>
      </label></div>
  </div>`
  });
  document.getElementsByClassName('grant-search_list-wrapper')[4].innerHTML = grantsCategoriesHtml;
}
window.onload = async function () {
  token = localStorage.getItem('accessToken')
  response = await listGrantCategories()
  console.log('window.onload grant categories response', response)
  if (response && response.status === false) {
    localStorage.removeItem('accessToken')
    getResponse(response)
    return;
  }
  renderCategories(response)
  page = 1;
  listGrantData()

  function isExsist(CategoryId) {
    if (getArrayCategory.includes(CategoryId))
      return true
    else
      return false
  }
  const categorySearchList = document.getElementsByClassName("grant-search_list-wrapper")[4];
  console.log("categorySearchList", categorySearchList)
  categorySearchList.addEventListener('change', async (event) => {
    page = 1;
    const getCategoryId = event.target.parentElement.id;
    let check = isExsist(getCategoryId)
    if (check) {
      var idIndex = getArrayCategory.indexOf(getCategoryId);
      getArrayCategory.splice(idIndex, 1);
    }
    else {
      getArrayCategory.push(getCategoryId)
    }
    grantsHtml = ""
    listGrantData()
  })
  document.getElementById("field-3").addEventListener("keypress", function (e) {
    console.log('key pressed')
    if (e.key === "Enter") {
      page = 1;
      grantsHtml = ""
      getInputField();
    }
  })
}
window.addEventListener('scroll', function () {
  console.log('page scroll', page)
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1) {
    loadMore();
  }
});