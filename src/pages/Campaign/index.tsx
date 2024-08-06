import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CampaignGoalSelector from '../../components/CampaignGoalSelector';
import Advertiser from '../../components/Advertiser';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import RightSideCard from '../../components/RightSideCard';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { MdCampaign } from 'react-icons/md';
import { FaAdversal } from 'react-icons/fa';
import { FaUserClock } from 'react-icons/fa';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Apple } from 'lucide-react';

const Campaigns = () => {
  const [campaignName, setCampaignName] = useState('');
  const [campaignGoal, setCampaignGoal] = useState<string | null>(null);
  const [campaignType, setCampaignType] = useState('');
  const [advertiser, setAdvertiser] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectInput, setSelectInput] = useState<string>('');
  const [campaignBudget, setCampaignBudget] = useState('');
  const { user } = useUser();
  const [received, setReceived] = useState(false);
  const navigate = useNavigate();

  const { orgId, userId } = useAuth();
  console.log(user?.id)
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const campaignData = {
      userId: user?.id, 
      campaignId: `CAM_${user?.id}`,
      campaignName,
      campaignGoal,
      campaignAdvertiserBudget: advertiser,
      campaignBudget,
      campaignType,
      startDate: startDate?.toDateString(),
      endDate: endDate?.toDateString(),
    };

    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Campaign created successfully:', data);
        setReceived(true);
        toast.success('Campaign submitted successfully!');
        navigate('/strategy');
      } else {
        console.error('Failed to create campaign:', data);
        toast.error('Failed to submit campaign.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while submitting the campaign.');
    }
  };

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value ? new Date(event.target.value) : null;
    setStartDate(dateValue);
  };

  const handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value ? new Date(event.target.value) : null;
    setEndDate(dateValue);
  };

  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Campaigns" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Campaign Name --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center gap-2 border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <MdCampaign className="text-[20px]" />
              <h3 className="font-medium text-black dark:text-white">
                Campaign Name
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Name your campaign
                </label>
                <input
                  type="text"
                  placeholder="Default Input"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* <!-- Campaign Goal --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white flex items-center gap-2">
                <Apple className="text-[.5rem]" />
                Select your campaign goal
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5 ">
              <CampaignGoalSelector
                onSelect={(goal) => setCampaignGoal(goal)}
              />
            </div>
          </div>

          {/* <!-- Advertiser --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className=" flex items-center gap-2 border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <FaAdversal className="text-[20px]" />
              <h3 className="font-medium text-black dark:text-white">
                Advertiser
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <Advertiser
                onSelect={(adv) => setCampaignType(adv)}
                adBud={setAdvertiser}
                campBud={setCampaignBudget}
              />
            </div>
          </div>

          {/* <!-- Date Picker --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className=" flex items-center gap-2 border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <FaUserClock className="text-[20px]" />
              <h3 className="font-medium text-black dark:text-white">
                Time and date
              </h3>
            </div>
            <div className="flex gap-7 p-6.5 text-left">
              <div className="p-2 border rounded-2xl">
                <span className="font-semibold mb-1 pl-2">Start Date</span>
                <input
                  type="date"
                  name="start-date"
                  className="dark:bg-slate-800 mt-2 rounded-md pl-2"
                  onChange={handleStartDate}
                />
              </div>
              <div className="p-2  border rounded-2xl">
                <span className="font-semibold mb-1 text-left pl-2">
                  End Date
                </span>
                <input
                  type="date"
                  name="end-date"
                  className="dark:bg-slate-800 mt-2 rounded-md pl-2"
                  onChange={handleEndDate}
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="cursor-pointer p-2 rounded-lg text-white bg-slate-400 w-[10rem] hover:bg-slate-600 transition relative left-[50%] translate-x-[-50%] translate-y-[50%] mb-4"
            >
              Submit Campaign
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-9 md:fixed right-5 overflow-auto h-[70vh] scroll-m-3 ">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <RightSideCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaigns;
