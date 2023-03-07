const listGrantCategories = async () => {
  try {
    const response = await fetch('https://civitas-api.arhamsoft.org/v1/front/grants/list-active-grants', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    })
    let data = response.data.activeGrants;
     console.log("list active grants", data);
     let activeGrantHtml = '';
     data.forEach(activeGrant=> {
        activeGrantHtml+=`
        <div class="div-block">
          <h4>${activeGrant.name}</h4>
          <div class="org-dashboard_active-progress-bar">
            <div class="org-dashboard_active-progress"></div>
          </div>
          <div><span>40% of </span>grant budget used</div>
          <div class="padding-bottom padding-xsmall"></div>
          <div>Snapshot:<span></span></div>
          <div>Transactions: <span>-</span></div>
          <div>Cases: <span>-</span></div>
          <div>Smart Contracts: <span>-</span></div>
          <div class="padding-bottom padding-small"></div><a href="#" class="left-align-button w-inline-block">
            <div>Review </div>
            <div class="icon-embed-xsmall w-embed"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ic" width="currentWidth" height="currentHeight" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path fill="currentColor" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
              </svg></div>
          </a>
        </div>`
     })
         console.log(document.getElementsByClassName('org-dashboard_active-program-item')[0])
    document.getElementsByClassName('org-dashboard_active-program-item')[0].innerHTML = activeGrantHtml;
  } catch (err) {
    console.log(err)
  }
}

window.onload = function () {
  listGrantCategories()
}