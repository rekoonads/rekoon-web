import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import Logo from '../../images/logo/logo.svg';
import { MdCampaign, MdDashboard } from 'react-icons/md';
import { SiMicrostrategy } from 'react-icons/si';
import { MdOutlinePriceChange } from 'react-icons/md';
import SidebarLinkGroup from '../Sidebar/SidebarLinkGroup';
import { MdManageAccounts } from "react-icons/md";
import { IoPeopleSharp } from "react-icons/io5";
import { LiaAdversal } from "react-icons/lia";
import { GoGear } from "react-icons/go";
import { IoCodeSlashSharp } from "react-icons/io5";
import { CiMobile1 } from "react-icons/ci";
import { FaRuler } from "react-icons/fa";
import { FaPencilRuler } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { MdPayment } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaReceipt } from "react-icons/fa";
import { RiCoupon3Fill } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const SettingSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              Menu
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item General --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/settings' ||
                  pathname.includes('/settings/general')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <div className="flex flex-col">
                          <div className='mb-5'>
                        <div className=" cursor-pointer mb-2 group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out  dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                          }">
                         <MdManageAccounts className='text-[22px] '/>
                           Accounts
                         </div>
      
                          <ul className='ml-4 text-sm font-[200]'>
                      <NavLink
                        to="/settings/general"
                        className={` group relative flex items-center gap-2.5 rounded-sm py-3 px-4  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <GoGear className='text-[15px]' />
                        <span className='font-[500]'>General</span>
                      </NavLink>
                      <NavLink
                        to="/settings/members"
                        className={` group relative flex items-center gap-2.5 rounded-sm py-3 px-4  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <IoPeopleSharp className='text-[15px]'/>
                        <span className='font-[500]'>Members</span>
                      </NavLink>
                      <NavLink
                        to="/settings/advertisers"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-3 px-4  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <LiaAdversal className='text-[15px]' />
                        <span className='font-[500]'>Advertisers</span>
                      </NavLink>
                      
                          </ul>
                          </div>
                          <div className='mb-5'>
                              <div className="cursor-pointer mb-2 group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                 pathname.includes('/settings/general') &&
                              'bg-graydark dark:bg-meta-4'
                                  }">
                             <FaPencilRuler className='text-[18px]'/>
                               Measurement
                              </div>
      
                              <ul className='ml-4 text-sm font-[200]'>
                      <NavLink
                        to="/settings/web-tracking"
                        className={` group relative flex items-center gap-2.5 rounded-sm py-3 px-4  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <IoCodeSlashSharp className='text-[15px]' />
                        <span className='font-[500]'>Web tracking</span>
                      </NavLink>
                      <NavLink
                        to="/settings/app-tracking"
                        className={` group relative flex items-center gap-2.5 rounded-sm py-3 px-4  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                          <CiMobile1 className='text-[15px]'/>
                          <span className='font-[500]'>App tracking</span>
                           </NavLink>
    
                           </ul>
                          </div>
                          <div className='mb-5'>
                        <div className="cursor-pointer mb-2 group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                          }">
                         <FaDollarSign className='text-[22px] '/>
                           Billing
                         </div>
      
                          <ul className='ml-4 text-sm font-[200]'>
                      <NavLink
                        to="/settings/balance-transaction"
                        className={` group relative flex items-center gap-2.5 rounded-sm py-3 px-4  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <AiOutlineTransaction className='text-[15px] ' />
                        <span className='font-[500]'>Balance & Transaction</span>
                      </NavLink>
                      <NavLink
                        to="/settings/payment-methods"
                        className={` group relative flex items-center gap-2.5 rounded-sm py-3 px-4  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <MdPayment className='text-[15px]'/>
                        <span className='font-[500]'>Payment methods</span>
                      </NavLink>
                      <NavLink
                        to="/settings/invoices"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-3 px-4  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <FaFileInvoiceDollar className='text-[15px]' />
                        <span className='font-[500]'>Invoices</span>
                      </NavLink>
                      <NavLink
                        to="/settings/receipts"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-3 px-4  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <FaReceipt className='text-[15px]' />
                        <span className='font-[500]'>Receipts</span>
                      </NavLink>
                      <NavLink
                        to="/settings/coupons"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-3 px-4  text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/coupons') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <RiCoupon3Fill className='text-[15px]' />
                        <span className='font-[500]'>Coupons</span>
                      </NavLink>
                      
                          </ul>
                          </div>
                      </div>
                     
                     
                      {/* <NavLink
                        to="/settings/general"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-3 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          pathname.includes('/settings/general') &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                      >
                        <MdDashboard />
                        General
                      </NavLink> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* <!-- Menu Item Campaign --> */}
          

              {/* <!-- Menu Item Strategy --> */}
            
            </ul>
          </div>

          {/* <!-- Others Group --> */}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default SettingSidebar;
