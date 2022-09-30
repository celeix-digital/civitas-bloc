import './App.css';
import Home from './home';
import Web3 from "web3";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import marketplaceAbi from '../src/abis/coin.json'
import { ENV } from "./config";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const HttpProvider = ENV.httpProvider;
const mintOrSend = async (addr, value, connectedAddress, methodType) => {
  try {

    if (!addr || !value) {
      toast.error("Value && Address Must be Selected");
      return
    }

    const contractAbi = marketplaceAbi
    const web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
    const tokenContract = new web3.eth.Contract(
      contractAbi,
      ENV.coinAddress,
    );

    if (methodType === "transfer") {
      let userBalance = await tokenContract.methods.getBalance(connectedAddress).call();
      if (userBalance < value)
        return toast.error("First update your balance");
    }

    let txDetails = await send(
      tokenContract.methods[methodType],
      [addr, value],
      connectedAddress
    );
    const txHash = txDetails.transactionHash;

    if (txHash)
      toast.success(`Your tx confirmed with given tx hash ${txHash}`);


  } catch (e) {
    console.log("Eeee", e)
    const eMessage = e.message.split('{')[0] || '';
    toast.error(eMessage);
    return false;
  }

}



const balanceFromContract = async (connectedAddress, setBalance) => {
  try {

    const contractAbi = marketplaceAbi
    const web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));

    const tokenContract = new web3.eth.Contract(
      contractAbi,
      ENV.coinAddress,
    );
    let userBalance = await tokenContract.methods.getBalance(connectedAddress).call();
    console.log(userBalance)
    setBalance(userBalance)
    return userBalance;


  } catch (e) {
    console.log("Eeee", e)
    const eMessage = e.message.split('{')[0] || '';
    toast.error(eMessage);
    return 0;
  }

}

const send = (method, params, from, value = 0) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    method(...params)
      .send({ from, value })
      .then((res) => {
        console.log("res = ", res)
        resolve(res);
      })
      .catch((err) => {
        console.log("err = ", err)
        reject(err);
      });
  });
};




function App() {



  const [accouts, setAccounts] = useState(null);
  const [balance, setBalance] = useState(0)
  useEffect(() => {

    main(setAccounts);
  }, [])

  async function main(setAccounts) {
    try {

      // Creating an instance of the Provider
      const web3 = new Web3(new Web3.providers.HttpProvider(HttpProvider));
      const accouts = await web3.eth.getAccounts().then(e =>
        setAccounts(e)
      );
    }
    catch (error) {
      console.log("Connection Error! ", error);
    }
  }

  return (
    <div className="App">
      <Home
        accounts={accouts}
        balance={balance}
        setBalance={setBalance}
        mintOrSend={mintOrSend}
        balanceFromContract={balanceFromContract}
      />
    </div>
  );
}

export default App;
