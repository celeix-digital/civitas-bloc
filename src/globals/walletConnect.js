const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
    chainId: 80001, // Polygon chain id
}
const networkName = 'matic';

async function conectMetamask(e) {
    console.log("conectMetamask...")
    e.preventDefault();
    return new Promise(async function (resolve, reject) {
        if (window.ethereum) {
            await window.ethereum.enable();
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log('accounts', accounts)
            if (accounts && accounts.length) {
                localStorage.setItem("connectedWallet", accounts[0])
            }
            window.web3 = new Web3(window.ethereum)
            resolve(accounts[0])
        }
        else {
            Toastify({
                text: "Please install Metamask",
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
        }
    })
}

async function conectMagicLink(e) {
    console.log("conectMagicLink...")
    e.preventDefault();
    return new Promise(async function (resolve, reject) {
        const magic = new Magic('pk_live_350FEFDEDF81F26B', { network: customNodeOptions });
        magic.network = networkName;
        window.web3 = new Web3(magic.rpcProvider);
        const fromAddress = (await web3.eth.getAccounts())[0];
        localStorage.setItem("connectedWallet", fromAddress)
        resolve(fromAddress)
    })
}

 function walletConnect() {
    const connectedWallet = localStorage.getItem('connectedWallet')
    if (connectedWallet) {
        removeModalOpenar(connectedWallet)
        if(document.querySelector('.text-size-small')){
        document.querySelector('.text-size-small').innerText = formatAddress(connectedWallet);
        }
    }
    else{
        if(document.querySelector('.text-size-small')){
        document.querySelector('.text-size-small').innerText = 'Connect Wallet'
        }
    }
if(document.querySelector('[data-element="metaMaskConnect"]')){
    document.querySelector('[data-element="metaMaskConnect"]').addEventListener('click', async function (e) {
        const getAddress = await conectMetamask(e);
        removeModalOpenar(getAddress);
        console.log('get metaMaskConnect Address', getAddress)
        if(document.querySelector('.text-size-small')){
        document.querySelector('.text-size-small').innerText = formatAddress(getAddress)
        }
        if(document.getElementsByClassName('fs_modal-1_close')){
        const close = document.getElementsByClassName('fs_modal-1_close')[0]
        close.click()
        }
    });
}
if( document.querySelector('[data-element="otherConnect"]')){
    document.querySelector('[data-element="otherConnect"]').addEventListener('click', async function (e) {
        const getAddress = await conectMagicLink(e)
        removeModalOpenar(getAddress);
        console.log('get otherConnect Address', getAddress)
        if(document.querySelector('.text-size-small')){
        document.querySelector('.text-size-small').innerText = formatAddress(getAddress)
        }
        if(document.getElementsByClassName('fs_modal-1_close')){
        const close = document.getElementsByClassName('fs_modal-1_close')[0]
        close.click()
        }
    });
}
}

const formatAddress = (address) => {
    return address ? address.substr(0, 6) + '...' + address.substr(-4) : null;
}

const removeModalOpenar = (address) => {
    setTimeout(()=>{
        // console.log(document.querySelector('.fs_modal-1_component'))
        if(document.querySelector('.fs_modal-1_component')){
        let modalOpenar = document.querySelector('.fs_modal-1_component');
        modalOpenar.innerHTML = `<div role="button" class="button is-small_button">
        <div class="text-size-small">${formatAddress(address)}</div>
      </div>`;
        }
    },1000)
}

walletConnect()
