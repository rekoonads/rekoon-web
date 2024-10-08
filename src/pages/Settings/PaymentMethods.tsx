import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { FaRegFileAlt } from 'react-icons/fa';

const PaymentMethods = () => {
  return (
    <main className="w-full py-12 px-4 md:px-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div id="balance-container" className="flex flex-col justify-evenly ">
        <div
          id="balance-header-container"
          className="flex justify-between w-full h-fit  leading-snug p-2 relative bottom-6"
        >
          <div
            id="header-left-container"
            className="flex w-[100%] flex-col items-start h-full mr-3"
          >
            <div id="header-text" className="w-fit ">
              <h2 className="text-[20px] font-[800] text-black dark:text-whiten">
                Payment methods
              </h2>
            </div>
            <div id="header-bottom-statement" className="w-full mt-1">
              <p className="text-sm font-[400] text-slate-600 dark:text-white">
                Read our article about{' '}
                <Link
                  to={
                    'https://utfs.io/f/e4a9e629-d2b5-4c3c-b087-24bd8b8363e9-skm4rz.pdf'
                  }
                >
                  <span className="text-purple-500">Billing and payment</span>
                </Link>{' '}
                are associated with your account
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-[0.1px] bg-slate-200 relative bottom-6" />
        <div
          id="body"
          className="w-full h-[90vh] flex flex-col justify-center items-center gap-1"
        >
          <div
            id="no-tansaction"
            className=" border-none rounded-lg text-[25px]  dark:text-slate-500 "
          >
            <span>
              <FaRegFileAlt />
            </span>
          </div>
          <h1 className=" font-bold leading-snug dark:text-white text-black-2 ">
            No credit cards
          </h1>
          <p className="text-sm font-[500]">
            You don't have any payment methods yet
          </p>
          <button className="px-2 mt-2 h-[2.1rem] bg-blue-900 border-blue-600 dark:bg-yellow-200 dark:text-yellow-900 dark:hover:bg-blue-700 dark:hover:text-white rounded-md text-white hover:text-green-50 hover:bg-purple-600 transition font-[500]">
            {' '}
            + Add credit card
          </button>
        </div>
      </div>
    </main>
  );
};

export default PaymentMethods;
