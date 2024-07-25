import React from 'react';
import { IoReceipt } from 'react-icons/io5';
import { LiaFileInvoiceSolid } from 'react-icons/lia';



const Invoices = () => {
  return (
    <main className="w-full py-12 px-4 md:px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div id="balance-container" className="flex flex-col justify-evenly ">
      <div id="balance-header-container" className="flex justify-between w-full h-fit  leading-snug p-2 relative bottom-6">
        <div id="header-left-container" className="flex w-[100%] flex-col items-start h-full mr-3">
          <div id="header-text" className="w-fit "><h2 className="text-[20px] font-[800] text-black dark:text-whiten">Invoices</h2></div>
          <div id="header-bottom-statement" className="w-full mt-1"><p className="text-sm font-[400] text-slate-600 dark:text-white">Review and download all invoices associated with this account, across campaings and advertisers</p></div>
        </div>
      </div>
      <div className="w-full h-[0.1px] bg-slate-200 relative bottom-6"/>
      <div id="body" className="w-full h-[90vh] flex flex-col justify-center items-center gap-1">
          <div id="no-tansaction" className=" border-none rounded-lg text-[25px]  dark:text-slate-500 "><span><IoReceipt /></span></div>
          <h1 className=" font-bold leading-snug dark:text-white text-black-2 ">No invoices</h1>
          <p className="text-sm font-[500]">You don't have any invoices yet</p>
      </div>
    </div>
    </main>  
  )};

export default Invoices;
