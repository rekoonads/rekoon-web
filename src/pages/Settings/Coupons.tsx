import React from 'react';
import { LiaFileInvoiceSolid } from 'react-icons/lia';

const Coupons = () => {
  return (
    <main className="w-full py-12 px-4 md:px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div id="balance-container" className="flex flex-col justify-evenly ">
      <div id="balance-header-container" className="flex justify-between w-full h-fit  leading-snug p-2 relative bottom-6">
        <div id="header-left-container" className="flex w-[100%] flex-col items-start h-full mr-3">
          <div id="header-text" className="w-fit "><h2 className="text-[20px] font-[800] text-black dark:text-whiten">Coupons</h2></div>
          <div id="header-bottom-statement" className="w-full mt-1"><p className="text-sm font-[400] text-slate-600 dark:text-white">Find all available, pending, past and/or active <span className=' dark:text-blue-200 text-blue-900'>Vibe.co</span> coupons here</p></div>
        </div>
      </div>
      <div className="w-full h-[0.1px] bg-slate-200 relative bottom-6"/>
      <div id="body" className="w-full h-[90vh] flex flex-col justify-center items-center gap-1">
          <div id="no-tansaction" className=" border-none rounded-lg text-[25px]  dark:text-slate-500 "><span><LiaFileInvoiceSolid/></span></div>
          <h1 className=" font-bold leading-snug dark:text-white text-black-2 ">No coupons</h1>
          <p className="text-sm font-[500] mb-2">You don't have any coupons yet</p>
          <div className='flex justify-evenly gap-5 h-[2rem] '>
            <input type="text" className='w-39 bg-slate-200 text-center dark:bg-slate-600 border-none rounded-md outline-none placeholder:text-sm placeholder:p-2 ' placeholder='Enter your coupon..'/>
            <button className="w-[6rem] h-[2.1rem] bg-blue-900 border-blue-600 dark:bg-yellow-200 dark:text-yellow-900 dark:hover:bg-blue-700 dark:hover:text-white rounded-md text-white hover:text-green-50 hover:bg-purple-600 transition font-[500] px-2">Apply</button>
          </div>
      </div>
    </div>
    </main>  
  );
};
export default Coupons;
