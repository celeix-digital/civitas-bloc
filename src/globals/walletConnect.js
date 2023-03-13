const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.maticvigil.com/', // Polygon RPC URL
    chainId: 80001, // Polygon chain id
}
const networkName = 'matic';

async function conectMetamask(e) {
    e.preventDefault();
    if(window.ethereum) {
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('accounts', accounts)
        if(accounts && accounts.length) {
        localStorage.setItem("connectedWallet", accounts[0])
        }
        window.web3 = new Web3(window.ethereum)
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
}

async function conectMagicLink(e) {
    e.preventDefault();
    const magic= new Magic('pk_live_350FEFDEDF81F26B', { network: customNodeOptions });
    magic.network=networkName;
    window.web3 = new Web3(magic.rpcProvider);
    const fromAddress = (await web3.eth.getAccounts())[0];
    localStorage.setItem("connectedWallet", fromAddress)
}

window.onload = function () {
    const metamaskGlobalButton = document.querySelector('[data-element="metaMaskConnect"]');
    metamaskGlobalButton.onClick = conectMetamask;

    const magiclinkGlobalButton = document.querySelector('[data-element="otherConnect"]');
    magiclinkGlobalButton.onClick = conectMagicLink;
}