const url = 'https://civitas-api.herokuapp.com/v1/front/organizations/list'
var logoInput
const listOrganizationData = async obj => {
  console.log('url', url)
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        console.log('khakhi')
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
  const data = response.data.organization
  console.log('data', data)

  var table = document.getElementById('myTable')
  console.log('table', table)
  for (let i = 0; i < data.length; i++) {
    var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
   var cell2 = row.insertCell(1);
   var cell3 = row.insertCell(2);
   var cell4 = row.insertCell(3);
   var cell5 = row.insertCell(4);
   var cell6 = row.insertCell(5);
   var cell7 = row.insertCell(6);
   var cell8 = row.insertCell(7);
   var cell9 = row.insertCell(8);
   var cell10 = row.insertCell(9);
   var cell11 = row.insertCell(9);
   var cell12 = row.insertCell(9);
   var cell13 = row.insertCell(9);


   cell1.innerHTML = data[i]._id;
   cell2.innerHTML = data[i].name;
   cell3.innerHTML = data[i].type;
   cell4.innerHTML = data[i].websiteAboutOrganization; 
   cell5.innerHTML = data[i].serviceProvided;
   cell6.innerHTML = data[i].walletAddress;
   cell7.innerHTML = data[i].logo;
   cell8.innerHTML = data[i].organizationCode;
   cell9.innerHTML = data[i].street1;
   cell10.innerHTML = data[i].street2;
   cell11.innerHTML = data[i].city;
   cell12.innerHTML = data[i].state;
   cell13.innerHTML = data[i].zip;
  }
  if (response && response.success) {
    if (successMessageContainer)
      successMessageContainer.innerHTML = response.message
  } else if (response && !response.success) {
    if (errorMessageContainer)
      errorMessageContainer.innerHTML = response.message
  }
})
