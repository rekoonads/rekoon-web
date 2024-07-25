interface BalanceProps {

}

const Balance = ({}:BalanceProps) => {
  return (
    <div id="balance-container" className="flex flex-col justify-evenly ">
      <div id="balance-header-container" className="mx-0 px-0 flex justify-between w-full h-[5rem]">
        <div id="header-left-container" className="mx-0 px-0 flex w-[90%] flex-col items-start h-full">
          <div id="header-text"><h2>Balance & Transactions</h2></div>
          <div id="header-bottom-statement"><p>Monitor your transactions and account balance from this page. Funds will be withdrawn from your credit balance by default, whether or not other <span className="text-purple-500">payment methods</span> are associated with your account</p></div>
        </div>
        <div id="header-right-cotainer" className="flex w-[10%] flex-col items-center">
          <div id="account-container" className="flex justify-evenly w-full">
            <div id="account-balance">
              <span>Account balance</span>
              <p>$0.00</p>
            </div>
            <div id="spent-this-month">
              <span>Spent this month</span>
              <p>$0.00</p>
            </div>
          </div>   
        </div>
      </div>
      <div className="w-full h-[0.1px] bg-slate-200"/>
    </div>
    
  )};

export default Balance;
