import { Link } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';

interface BalanceProps {
  accountBalance?: float;
  spentThisMonth?: float;
}

interface TableCardProps {
  incomingDataArr?: any;
}

const TableCard = ({ incomingDataArr }: TableCardProps) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-4 text-center border">
      <div className="md:text-[14px] font-bold">
        {incomingDataArr?.campaignId}
      </div>
      <div className="md:text-[14px] font-bold mt-2 ">
        ₹{incomingDataArr?.campaignBudget}
      </div>
      <div className="md:text-[14px] font-bold mt-2">
        {incomingDataArr?.startDate}
      </div>
      <div className="md:text-[14px] font-bold mt-2">
        {incomingDataArr?.endDate}
      </div>
      <div className="md:text-[14px] font-bold mt-2">Transaction Id </div>
    </div>
  );
};

const Balance = ({ accountBalance, spentThisMonth }: BalanceProps) => {
  const domainName = import.meta.env.VITE_DOMAIN;
  const [isAdd, setIsAdd] = useState<UserData | undefined>(undefined);
  const { user } = useUser();
  //Searching User Type
  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await fetch(`${domainName}/api/search-user/${id}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: UserData = await response.json();
        setIsAdd(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user?.id) {
      fetchData(user.id);
    }
  }, [user?.id]);

  // _____________________________________________________________________________________________________

  //getting the campaign data
  const { orgId, userId } = useAuth();
  const [retrivedCampaignData, setRetrivedCampaignData] = useState<any>();

  console.log(isAdd?.type_of_user);
  //get the campaign data for that specific user
  useEffect(() => {
    if (isAdd?.type_of_user === 'Advertiser') {
      const getCamp = async () => {
        try {
          const data = await axios.get(
            `${domainName}/api/campaigns-advertiser/${user?.id}`,
          );
          console.log(data);
          setRetrivedCampaignData(data);
        } catch (error) {
          console.log(error);
        }
      };
      getCamp();
    } else if (isAdd?.type_of_user === 'Agency') {
      const getCamp = async () => {
        try {
          const data = await axios.get(
            `${domainName}/api/campaigns-agency/${orgId}`,
          );
          console.log(data);
          setRetrivedCampaignData(data);
        } catch (error) {
          console.log(error);
        }
      };
      getCamp();
    }
  }, [user?.id, orgId, isAdd]);

  console.log(retrivedCampaignData?.data);

  // getting the Payment Id
  const [paymentId, setPaymentId] = useState<atring>('');
  useEffect(() => {
    let getTransactionId = async () => {
      try {
        const data = await axios.get(
          `${domainName}/api/bill/${retrivedCampaignData?.datacampaignId}`,
        );
        console.log(data);
        setPaymentId(data)
      } catch (error) {
        console.log(error);
      }
    };
    getTransactionId()
  }, [retrivedCampaignData?.data.campaignId]);



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
                Balance & Transactions
              </h2>
            </div>
            <div id="header-bottom-statement" className="w-full mt-1">
              <p className="text-sm font-[400] text-slate-600 dark:text-white">
                Monitor your transactions and account balance from this page.
                Funds will be withdrawn from your credit balance by default,
                whether or not other{' '}
                <Link to={'/settings/payment-methods'}>
                  <span className="text-purple-500">payment methods</span>
                </Link>{' '}
                are associated with your account
              </p>
            </div>
          </div>
          <div
            id="header-right-cotainer"
            className="flex w-[30%] flex-col items-center gap-2 relative bottom-1"
          >
            <div
              id="account-container"
              className="flex gap-5 justify-evenly w-full leading-2"
            >
              <div id="account-balance" className="leading-snug mr-1">
                <p className="text-[11px] mb-1 font-[400] text-slate-600 dark:text-white">
                  Account balance
                </p>
                <p>₹{isAdd?.user?.walletBalance}</p>
              </div>
              <div id="spent-this-month" className="leading-snug">
                <p className="text-[11px] mb-1 font-[400] text-slate-600 dark:text-white">
                  Spent this month
                </p>
                <p>₹0.00</p>
              </div>
            </div>
            <button className="px-1 w-[100%] h-[2.1rem] bg-blue-900 border-blue-600 dark:bg-yellow-200 dark:text-yellow-900 dark:hover:bg-blue-700 dark:hover:text-white rounded-md text-white hover:text-green-50 hover:bg-purple-600 transition font-[500]">
              {' '}
              + Add credits
            </button>
          </div>
        </div>
        <div className="w-full h-[0.1px] bg-slate-200 relative bottom-6" />
        {/* Table */}
        {retrivedCampaignData ? (
          <>
            {' '}
            <div className="grid grid-cols-5 gap-4 p-4 text-sm text-center">
              <div className="flex flex-col item-center justify-center">
                <div className=" md:text-[20px] font-medium">Campaign Id</div>
                <div className="w-[80%] h-[1px] dark:bg-white bg-inhrit mt-3 ml-5" />
              </div>
              <div className="flex flex-col item-center justify-center">
                <div className=" md:text-[20px] font-medium">
                  Campaign Budget
                </div>
                <div className="w-[80%] h-[1px] dark:bg-white bg-inhrit mt-3 ml-5" />
              </div>
              <div className="flex flex-col item-center justify-center">
                <div className=" md:text-[20px] font-medium">Start Date</div>
                <div className="w-[80%] h-[1px] dark:bg-white bg-slate-500 mt-3 ml-5" />
              </div>
              <div className="flex flex-col item-center justify-center">
                <div className=" md:text-[20px] font-medium">End Date</div>
                <div className="w-[80%] h-[1px] dark:bg-white bg-inhrit mt-3 ml-5" />
              </div>
              <div className="flex flex-col item-center justify-center">
                <div className=" md:text-[20px] font-medium">
                  Transaction Id
                </div>
                <div className="w-[80%] h-[1px] dark:bg-white bg-inhrit mt-3 ml-5" />
              </div>
            </div>
            {retrivedCampaignData?.data.map((item, index) => (
              <TableCard incomingDataArr={item} key={index} />
            ))}
          </>
        ) : (
          <>
            <div
              id="body"
              className="w-full h-[90vh] flex flex-col justify-center items-center gap-1"
            >
              <div
                id="no-tansaction"
                className=" border-none rounded-lg text-[25px]  dark:text-slate-500 "
              >
                <span>
                  <IoMdLogOut />
                </span>
              </div>
              <h1 className=" font-bold leading-snug dark:text-white text-black-2 ">
                No transactions
              </h1>
              <p className="text-sm font-[500]">
                You don't have any transactions yet
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Balance;
