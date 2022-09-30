import React, { useState } from "react";
import './Home.css'
function Home(props) {
    console.log(props)
    const [mUserAccount, setMUserAccount] = useState("");
    const [mUserAmount, setMUserAmount] = useState(null);

    const [sUserAccount, setSUserAccount] = useState("");
    const [sUserAmount, setSUserAmount] = useState(null);

    const checkBalance = (e) => {
        e.preventDefault();
        props.balanceFromContract(props.accounts[0], props.setBalance)
    }

    const mintCoin = (e) => {
        e.preventDefault();
        props.mintOrSend(mUserAccount, mUserAmount, props.accounts[0], "mint")
    }

    const sendCoin = (e) => {
        e.preventDefault();
        console.log("sUserAccount",sUserAccount)
        props.mintOrSend(sUserAccount, sUserAmount, props.accounts[0], "transfer");
    }

    return (
        <main className="main-wrapper" id="test-app">
        <section className="section_test-app">
          <div className="page-padding">
            <div className="container-large" />
          </div>
          <div className="padding-global">
            <div className="test-app_wrapper">
              <div className="container-medium">
                <div className="test-app_component">
                  <div className="margin-bottom margin-small text-align-center">
                    <h1>Coin Transaction</h1>
                    <div>Minter:</div>
                    <div>Current User Account: {props?.accounts?.length && props.accounts[0]}</div>
                  </div>
                  <div className="test-app_item text-align-center">
                    <h3>Check Balance</h3>
                    <div>Account: {props?.accounts?.length && props.accounts[0]}</div>
                    <div className="test-app_input">
                      <div className="test-app_form-wrapper w-form">
                        <form onSubmit={(e)=>checkBalance(e) } id="email-form" name="email-form" data-name="Email Form" method="get" className="test-app_form">
                            <label htmlFor="check-balance">Balance:</label>
                            <input type="text" className="text-field w-input" maxLength={256} name="check-balance" data-name="check-balance" placeholder id="check-balance" value={props?.balance} readOnly />
                            <input type="submit" defaultValue="Submit" data-wait="Please wait..." className="button w-button" />
                        </form>
                        <div className="w-form-done">
                          <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div className="w-form-fail">
                          <div>Oops! Something went wrong while submitting the form.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="test-app_item text-align-center">
                    <h3>Mint Coin</h3>
                    <div className="padding-bottom padding-medium" />
                    <div className="test-app_input">
                      <div className="test-app_form-wrapper w-form">
                        <form id="email-form" name="email-form" data-name="Email Form" method="get" className="test-app_form" onSubmit={(e) => mintCoin(e)}>
                          <div className="test-app_form-flex"><label htmlFor="mint-to">To:</label>
                          <select id="mint-to" name="mint-to" data-name="mint-to" className="w-select" onChange={(e) => setMUserAccount(e.target.value)} value={mUserAccount}>
                              <option value>Please Select Account</option>
                              {props?.accounts?.length > 0 && props.accounts.map((acc) => (<option value={acc}>{acc}</option>))}
                            </select></div>
                            <div className="test-app_form-flex">
                                <label htmlFor="min-amount">Amount:</label>
                                <input type="text" className="text-field w-input" maxLength={256} name="min-amount" data-name="min-amount" placeholder id="min-amount" value={mUserAmount}
                            onChange={(e) => setMUserAmount(e.target.value)} />
                            </div>
                            <input type="submit" defaultValue="Submit" data-wait="Please wait..." className="button is-hidden w-button" />
                        </form>
                        <div className="w-form-done">
                          <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div className="w-form-fail">
                          <div>Oops! Something went wrong while submitting the form.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="test-app_item text-align-center">
                    <h3>Send Coin</h3>
                    <div>Account:{props?.accounts?.length && props.accounts[0]}</div>
                    <div className="test-app_input">
                      <div className="test-app_form-wrapper w-form">
                        <form onSubmit={(e)=>sendCoin(e)} id="email-form" name="email-form" data-name="Email Form" method="get" className="test-app_form">
                            <input type="submit" defaultValue="Submit" data-wait="Please wait..." className="button is-hidden w-button" />
                          <div className="test-app_form-flex"><label htmlFor="send-to">To:</label>
                          <select id="send-to" name="send-to" data-name="send-to" className="w-select" onChange={(e) => setSUserAccount(e.target.value)} value={sUserAccount}>
                              <option value>Please Select an Account</option>
                              {props?.accounts?.length > 0 && props.accounts.map((acc) => (<option value={acc}>{acc}</option>))}
                            </select></div>
                          <div className="test-app_form-flex">
                            <label htmlFor="send-amount">Amount:</label>
                            <input type="text" className="text-field w-input" maxLength={256} name="send-amount" data-name="send-amount" placeholder id="send-amount" value={sUserAmount} onChange={(e) => setSUserAmount(e.target.value)} />
                        </div>
                        </form>
                        <div className="w-form-done">
                          <div>Thank you! Your submission has been received!</div>
                        </div>
                        <div className="w-form-fail">
                          <div>Oops! Something went wrong while submitting the form.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
}

export default Home;


