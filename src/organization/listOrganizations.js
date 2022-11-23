const url = 'https://civitas-api.herokuapp.com/v1/front/organizations/list?'
const listOrganizationData = async obj => {
  console.log('url', url)
  try {
    const response = await fetch(url+ new URLSearchParams({
      walletAddress: 'MasterCard',
      name:'IMF',
       method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })).then(response => {
      if (response.ok) {
        return response.json()
      } else {
      
      }
    })
    console.log('response', response)
    return response
  } catch (error) {
    return null
  }
}

const listOrganizationButton = (document.getElementById(
  'listOrganizationButton'
).onclick = async function () {
  let response = await listOrganizationData()
  console.log('response', response)
  if(response){
  var data = response.data.organization
  console.log('data', data)
  }
  let arrHead = new Array();
  let createDiv = document.createElement('div')
  createDiv.className = 'getData'
  console.log('createDiv', createDiv)
  arrHead = ['city', 'name', 'organizationCode', 'serviceProvided','state','street1','street2','type'
  ,'walletAddress','websiteAboutOrganization','zip','_id']; // table headers.
      let empTable = document.createElement('table');
      empTable.className = 'organizationTable'
      let thead = document.createElement('thead');
      let createRow = document.createElement('tr');
      arrHead.forEach(header=>{
        let createHeader = document.createElement('th'); 
        createHeader.innerText = header;
        createRow.append(createHeader)
      })
      thead.append(createRow)
      empTable.append(thead)
      let createBody = document.createElement('tbody');
      createBody.className = 'organizationData'
      empTable.append(createBody)
      console.log(empTable)
      createDiv.append(empTable)
      console.log(createDiv)
      if(data.length){
      for (let i = 0; i < data.length; i++) {
         var getRow = document.createElement('tr'); // the header object.
        for(let j = 0 ; j < arrHead.length ; j++){
          let td = document.createElement('td'); 
          let h = arrHead[j]
          console.log(data[i][h])
          td.innerText = data[i][h];
          getRow.append(td)
        }
        console.log("getRow",getRow)
        createBody.append(getRow)
        console.log("createDiv",createDiv)

        if(createDiv){
          document.getElementById('listOfOrganization').appendChild(createDiv)
        }
      }
    }
  if (response && response.success) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message
  } else if (response && !response.success) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message
  }
})
