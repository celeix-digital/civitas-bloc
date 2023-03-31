const draftGrantsUrl = 'https://civitas-api.arhamsoft.org/v1/front/grants/get-draft-grants'
const domainUrl = "https://civitasbloc.webflow.io/"
const blockChainExplorer = "https://mumbai.polygonscan.com/"
const contractAddress = "0xb9c0cc4e755664f01ed86f110f2472d19b318aa3";
const contractABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "AgencyAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "GrantCreated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "GrantUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "text", "type": "string" }], "name": "OrgAdded", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "AllAgency", "outputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "NoOfGrants", "type": "uint256" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "AllGrant", "outputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes32", "name": "agencyId", "type": "bytes32" }, { "internalType": "address", "name": "Approver", "type": "address" }, { "internalType": "uint256", "name": "Budget", "type": "uint256" }, { "internalType": "address", "name": "Creator", "type": "address" }, { "internalType": "bool", "name": "Approved", "type": "bool" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "name": "AllGrantSpent", "outputs": [{ "internalType": "bytes32", "name": "grantId", "type": "bytes32" }, { "internalType": "bytes32", "name": "orgId", "type": "bytes32" }, { "internalType": "uint256", "name": "Balance", "type": "uint256" }, { "internalType": "uint256", "name": "TotalBudgetAppointed", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "AllOrganization", "outputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_agencyAddress", "type": "address" }, { "internalType": "bytes32", "name": "_id", "type": "bytes32" }, { "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "uint256", "name": "_balance", "type": "uint256" }, { "internalType": "uint256", "name": "_noOfGrants", "type": "uint256" }, { "internalType": "bytes32", "name": "_infoLink", "type": "bytes32" }], "name": "addAgency", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "id", "type": "bytes32" }, { "internalType": "bytes32", "name": "agencyId", "type": "bytes32" }, { "internalType": "address", "name": "Approver", "type": "address" }, { "internalType": "uint256", "name": "Budget", "type": "uint256" }, { "internalType": "address", "name": "Creator", "type": "address" }, { "internalType": "bool", "name": "Approved", "type": "bool" }, { "internalType": "bytes32", "name": "InfoLink", "type": "bytes32" }], "name": "addGrant", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "bytes32", "name": "_id", "type": "bytes32" }, { "internalType": "bytes32", "name": "_infoLink", "type": "bytes32" }], "name": "addOrg", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_agencyAddress", "type": "address" }, { "internalType": "bytes32", "name": "_id", "type": "bytes32" }, { "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "uint256", "name": "_balance", "type": "uint256" }, { "internalType": "uint256", "name": "_noOfGrants", "type": "uint256" }, { "internalType": "bytes32", "name": "_infoLink", "type": "bytes32" }], "name": "updateGrantSpent", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

let draftGrantId;
let response;
let token;
let draftGrantsHtml;
let clickedButtonId;
let getEveryId;
let getAllRows;
let getColumn;
let txRes;
let totalBudget;
let data;
async function onInit(clickedButtonId, totalBudget) {
    return new Promise(async function (resolve, reject) {
        clickedButtonId = "0x" + clickedButtonId
        totalBudget = "0x" + totalBudget
        console.log('clickedButtonId', clickedButtonId)
        console.log('totalBudget', totalBudget)
        if (window.ethereum) {
            await window.ethereum.enable();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            fromAddress = accounts[0];
            console.log('account', fromAddress);
            web3 = new Web3(window.ethereum)
        }
        else {
            const customNodeOptions = {
                rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
                chainId: 80001, // Polygon chain id
            }
            const magic = new Magic('pk_live_350FEFDEDF81F26B', { network: customNodeOptions });
            magic.network = 'matic';
            web3 = new Web3(magic.rpcProvider);
            fromAddress = (await web3.eth.getAccounts())[0];
            console.log("fromAddress");
            console.log(fromAddress);
        }
        const celiexContract = new web3.eth.Contract(contractABI, contractAddress)
        celiexContract.methods
            .addGrant(clickedButtonId, '0x11111111111111111111111', '0x7Eb0156eF2b1d3545c8684d9eb005207Aaa723B7', totalBudget, '0x7Eb0156eF2b1d3545c8684d9eb005207Aaa723B7', false, '0x1111111')
            .send({ from: fromAddress }, function (err, res) {
                if (err) {
                    console.log(err)
                    reject(false)
                    return
                }
                resolve(res)
            })
    })
}
const approveGrant = async () => {
    const obj = {
        draftGrantId,
        txRes
    }
    try {
        response = await fetch(`https://civitas-api.arhamsoft.org/v1/front/grants/publish-grant`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(obj),
        })
        response = await response.json();
        return response;
    } catch (error) {
        return null
    }
}
const getDraftGrants = async () => {
    try {
        response = await fetch(draftGrantsUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        response = await response.json();
        return response;
    } catch (err) {
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
    window.location.href = `${domainUrl}agency/login`
}
const renderdraftGrants = (response) => {
    let data = response.draftGrants;
    console.log('data renderdraftGrants', data)
    data.forEach(draftGrant => {
        draftGrantsHtml += `<div role="row" class="open-grants_item" id=${draftGrant._id} totalbudget=${draftGrant.totalBudget}>
    <div role="cell" class="open-grants_column">
      <div fs-cmssort-field="IDENTIFIER" class="text-weight-medium">${draftGrant.name}</div>
    </div>
    <div role="cell" class="open-grants_column is-width-large">
      <div fs-cmssort-field="IDENTIFIER">${draftGrant.rfaNo}</div>
    </div>
    <div role="cell" class="open-grants_column is-width-small">
      <div class="status-indicator">
        <div fs-cmssort-field="IDENTIFIER">${draftGrant.published}</div>
      </div>
    </div>
    <div role="cell" class="open-grants_column is-width-large">
      <div fs-cmssort-field="IDENTIFIER">${draftGrant.creatorname}</div>
    </div>
    <div role="cell" class="open-grants_column is-width-medium">
      <div fs-cmssort-type="date" fs-cmssort-field="IDENTIFIER">${draftGrant.createdAt}</div>
    </div>
    <div role="cell" class="open-grants_column is-width-medium">
      <div class="status-indicator">
        <button fs-cmssort-field="IDENTIFIER" data-id=${draftGrant._id} class="my-button">Approve</button>
      </div>
    </div>
    <div class="open-grants_column-button-wrapper"><a href="#" class="open-grants_link">View</a></div>
  </div>`
    });
    document.getElementsByClassName('open-grants_list')[0].innerHTML = draftGrantsHtml;
}
const checkResponse = (message, txRes, backgroundcolor) => {
    console.log('txRes', txRes)
    Toastify({
        text: message,
        duration: 4000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
            background: `${backgroundcolor}`,
        },
        onClick: function () {
            window.open(`${blockChainExplorer}tx/${txRes}`)
        }
    }).showToast();
}
const isApproved = async() => {
    try {
        response = await fetch(`https://civitas-api.arhamsoft.org/v1/front/grants/is-approved`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
        response = await response.json();
        return response;
    } catch (error) {
        return null
    }
}
window.onload = async function () {
    token = localStorage.getItem('accessToken')
    response = await getDraftGrants()
    console.log('window.onload draft grant response', response)
    if (response && response.status === false) {
        localStorage.removeItem('accessToken')
        getResponse(response)
        return;
    }
    renderdraftGrants(response)
    let buttons = document.querySelectorAll(".my-button");
    await onReload(buttons)
    for (const button of buttons) {
        button.addEventListener('click', async (event) => {
            clickedButtonId = event.target;
            draftGrantId = clickedButtonId.getAttribute("data-id");
             const boolApproved = await isApproved()
             console.log('boolApproved', boolApproved)
            if (!boolApproved.success) {
                checkResponse(response.message, "", backgroundcolor = "red")
                return;
            }
            totalBudget = await getTotalBudget(draftGrantId)
            console.log("Button " + clickedButtonId.textContent + " clicked." + draftGrantId);
            txRes = await onInit(draftGrantId, totalBudget);
            console.log('txRes', txRes)
            response = await approveGrant()
            console.log('response approve', response)
            data = response.publishGrants
            if (response && response.success) {
                if (data.published === 'Approved') {
                    checkResponse(response.message + " Click here to view the transsaction on chain.", txRes, backgroundcolor = "linear-gradient(to right, #00b09b, #96c93d)")
                    button.disabled = true
                    localStorage.setItem(draftGrantId, 'disabled');
                    await updateStatus(draftGrantId)
                }
            }
        });
    };
}
const onReload = async (buttons) => {
    for (const button of buttons) {
        getEveryId = button.getAttribute("data-id");
        console.log('getEveryId onReload', getEveryId)
        getColumn = await isStatusUpdated(getEveryId)
        console.log('getColumn Approved or Pending', getColumn)
        if (getColumn === 'Approved') {
            // if (localStorage.getItem(getEveryId) !== 'disabled')
            button.disabled = true;
        }
        // else {
        //     button.disabled = false;
        // }
    };

}
const getTotalBudget = (draftGrantId) => {
    getAllRows = document.getElementsByClassName('open-grants_item')
    for (const row of getAllRows) {
        if (row.id === draftGrantId) {
            totalBudget = row.getAttribute("totalbudget")
            return totalBudget
        }
    }
}
const isStatusUpdated = (draftGrantId) => {
    getAllRows = document.getElementsByClassName('open-grants_item')
    for (const row of getAllRows) {
        if (row.id === draftGrantId) {
            getColumn = row.querySelectorAll('.open-grants_column')[2]
            getColumn = getColumn.querySelectorAll('.status-indicator')[0]
            getColumn = getColumn.querySelector('[fs-cmssort-field="IDENTIFIER"]').innerHTML
            return getColumn
        }
    }
}
const updateStatus = (draftGrantId) => {
    getAllRows = document.getElementsByClassName('open-grants_item')
    console.log('getAllRows updateStatus', getAllRows)
    for (const row of getAllRows) {
        if (row.id === draftGrantId) {
            getColumn = row.querySelectorAll('.open-grants_column')[2]
            getColumn = getColumn.querySelectorAll('.status-indicator')[0]
            getColumn.querySelector('[fs-cmssort-field="IDENTIFIER"]').innerHTML = 'Approved'
        }
    }
}