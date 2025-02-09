import { TabsTrigger } from '@radix-ui/react-tabs';
import { ArrowUp, Redo2, Smartphone, Tablet, Tv } from 'lucide-react';
import { useEffect, useState } from 'react';
import Channels from '../../components/Apps&Channels';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import CheckboxOne from '../../components/Checkboxes/CheckboxOne';
import DateSection from '../../components/DateSection';
import { Button } from '../../components/ui/button';
import { Tabs, TabsList } from '../../components/ui/tabs';
import { v4 as uuidv4 } from 'uuid';
import { BsThunderboltFill } from 'react-icons/bs';
import { FaInfoCircle } from 'react-icons/fa';
import { LuRadioReceiver } from 'react-icons/lu';
import { RiCheckFill } from 'react-icons/ri';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import RightSideCard from '../../components/RightSideCard';
import { Card, CardContent } from '../../components/ui/card';
import { GiBrain } from 'react-icons/gi';
import { FaSearchDollar } from 'react-icons/fa';
import { LuHeartHandshake } from 'react-icons/lu';
import { FaGenderless } from 'react-icons/fa';
import { FaPeopleArrows } from 'react-icons/fa';
import { MdOutlineScreenshotMonitor } from 'react-icons/md';
import { useAuth, useUser } from '@clerk/clerk-react';
import axios from 'axios';
import InputSelect from '../../components/InputSelect';
import VideoUpload from '../../components/VideoUpload';
import BannerUpload from '../../components/BannerUpload';
import Cookies from 'js-cookie';
import RightSidedStrategyCard from '../../components/RightSidedStrategyCard';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import RealTimeBidding from './RealTimeBidding';

const domainName = import.meta.env.VITE_DOMAIN;
interface Goal {
  id: string;
  icon: React.ElementType[];
  title: string;
  description: string;
}
interface DaySetting {
  startTime: string;
  endTime: string;
  selected: boolean;
}

interface DaySettings {
  [key: string]: DaySetting;
}

const goals: Goal[] = [
  {
    id: 'automatic',
    icon: [LuRadioReceiver],
    title: 'Automatic',
    description: 'I want to reach as many different viewers as possible.',
  },
  {
    id: 'manual',
    icon: [LuRadioReceiver],
    title: 'Manual',
    description: 'I want TV audiences to visit my website.',
  },
];
// Cookies.set('strategyId', 'ST-e272b9af-9c04-4c05-913a-3aecf62a445d', { expires: 7, path: '/' });
const defaultDaySettings = {
  Sunday: { startTime: '12:00am', endTime: '11:59pm', selected: false },
  Monday: { startTime: '12:00am', endTime: '11:59pm', selected: false },
  Tuesday: { startTime: '12:00am', endTime: '11:59pm', selected: false },
  Wednesday: { startTime: '12:00am', endTime: '11:59pm', selected: false },
  Thursday: { startTime: '12:00am', endTime: '11:59pm', selected: false },
  Friday: { startTime: '12:00am', endTime: '11:59pm', selected: false },
  Saturday: { startTime: '12:00am', endTime: '11:59pm', selected: false },
};

const Strategy = () => {
  const [strategyData, setStrategydata] = useState<any>(null);
  const [update, setUpdate] = useState(false);
  const [selectedTab, setSelectedTab] = useState('18-20');
  const [selectedGender, setSelectedGender] = useState('Women');
  const [selectedDevice, setSelectedDevice] = useState('TV');
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [audienceArr, setAudienceArr] = useState<string[]>([]);
  const [strategyName, setStrategyName] = useState<string>('');
  const [strategyDailyBudget, setStrategyDailyBudget] = useState<string>('');
  const [audience_location, setAudienceLocation] = useState<string>('');
  const [deliveryTypeval, setDeliveryType] = useState<String>();
  const [targetedIPs, setTargetedIPs] = useState<string[]>([]);
  const [locationIPs, setLocationIPs] = useState<string[]>([]); // Added state for IP addresses
  const [targetedAgeGroups, setTargetedAgeGroups] = useState<string[]>([]); // Added state for targeted age groups
  const [isAgeVerified, setIsAgeVerified] = useState<boolean | null>(null);
  const [ipsFetched, setIpsFetched] = useState(false); // Added state for IP fetch confirmation
  const [mediaType, setMediaType] = useState<'video' | 'banner'>('video'); // Added state for media type
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [currentBid, setCurrentBid] = useState<number>(0);

  const { user } = useUser();
  const handleReset = () => {
    setSelectedTab('18-20');
    setSelectedGender('Women');
    setSelectedDevice('TV');
    setTargetedAgeGroups([]); // Reset targeted age groups
    setTargetedIPs([]); // Reset targeted IPs
  };

  // if(audienceArr.includes(text)){
  //   setSelectedCheckbox(text);
  //   setAudienceArr((prevState) => [...prevState, text]);
  // }
  const handleCheckboxChange = (text: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCheckbox(text);
      setAudienceArr((prevState) => [...prevState, text]);
    } else {
      setSelectedCheckbox(null);
      setAudienceArr((prevState) => prevState.filter((item) => item !== text));
    }
  };

  const handleBidChange = (newBid: number) => {
    setCurrentBid(newBid);
    // You can add logic here to update the strategy or send the new bid to your backend
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.scrollY || document.documentElement.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        setIsScrollingDown(true);
      } else if (currentScrollTop < lastScrollTop) {
        setIsScrollingDown(false);
      }
      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const handleSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (value: string) => {
    setSelectedOption(value);
  };
  console.log(selectedOption);

  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const handleSelectedChannelsChange = (channels: string[]) => {
    setSelectedChannels(channels);
    console.log('Selected channels in parent:', channels);
  };

  const [daySettings, setDaySettings] =
    useState<DaySettings>(defaultDaySettings);

  const handleDaySettingsChange = (newDaySettings: DaySettings) => {
    setDaySettings(newDaySettings);
  };

  //Video Upload
  const handleFileNameChange = (fileName: string | null) => {
    setUploadedFileName(fileName);
  };

  const saveVideoDuration = (duration: number | null) => {
    setVideoDuration(duration);
  };
  console.log(videoDuration);
  //for Debugging

  //Advertiser id is the orgId
  const { orgId, userId } = useAuth();
  console.log(orgId, userId);
  const [isAdd, setIsAdd] = useState<string>('');

  //Fetching The Campaign Id
  const [campaignInfo, setCampaignInfo] = useState<string>('');
  console.log(isAdd?.type_of_user);

  useEffect(() => {
    const fetchCampaignId = async (url: string) => {
      try {
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const idData = await response.json();
        setCampaignInfo(idData);
      } catch (error) {
        console.error(error);
      }
    };

    if (isAdd?.type_of_user === 'Advertiser') {
      fetchCampaignId(`${domainName}/api/campaigns/${user?.id}`);
    } else if (isAdd?.type_of_user === 'Agency') {
      fetchCampaignId(`${domainName}/api/campaigns-agency/${orgId}`);
    }
  }, [isAdd?.type_of_user, user?.id, orgId]);

  //for Getting the Latest ids
  console.log(campaignInfo);
  const [info, setInfo] = useState<string>('');
  useEffect(() => {
    console.log(campaignInfo);
    if (isAdd?.type_of_user === 'Agency') {
      setInfo(orgId);
    } else if (isAdd?.type_of_user === 'Advertiser') {
      setInfo(campaignInfo[campaignInfo.length - 1]?.advertiserId);
    }
  }, [campaignInfo]);
  console.log(info);

  // searches for the type of user
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

  useEffect(() => {
    const cookies_data = Cookies.get('strategyId');
    console.log('cookies_data :- ', cookies_data);
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${domainName}/api/get-strategy?strategyId=${cookies_data}`,
        );
        console.log('previous strategy data:- ', response.data);
        setStrategydata(response.data);
      } catch (error) {
        console.error('Error fetching strategy data:', error);
      }
    };
    if (cookies_data) {
      setUpdate(true);
      fetchUserData();
    } else {
      setUpdate(false);
    }
  }, []);

  console.log(isAdd?.type_of_user);
  console.log('audiance location :- ', audience_location);

  //Handling Submission of data dont taper with this
  console.log(campaignInfo[campaignInfo.length - 1]?.campaignId);
  const [getBugOfRes, setGetBugOfRes] = useState<any>();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const strategy_id_data = strategyData
      ? strategyData.strategyId
      : `ST-${uuidv4()}`;
    try {
      console.log(campaignInfo[campaignInfo.length - 1]?.campaignId);
      const payload = {
        userId: userId,
        strategyId: strategy_id_data,
        ageRange: selectedTab,
        targetedAgeGroups: targetedAgeGroups, // Added targetedAgeGroups to payload
        gender: selectedGender,
        screens: selectedDevice,
        audiences: audienceArr,
        strategyName: strategyName,
        strategyDailyBudget: strategyDailyBudget,
        selectedGoal: selectedGoal,
        selectedOption: selectedOption,
        selectedChannels: selectedChannels,
        audienceLocation: audience_location,
        deliveryTimeSlots: daySettings,
        deliveryType: deliveryTypeval,
        creatives: uploadedFileName,
        currentBid: currentBid,
        mediaType: mediaType,
        duration: mediaType === 'video' ? videoDuration : null,
        campaignId: campaignInfo[campaignInfo.length - 1]?.campaignId,
        targetedIPs: targetedIPs, // Added targetedIPs to payload
      };

      if (isAdd?.type_of_user === 'Agency') {
        payload.agencyId = orgId;
      } else if (isAdd?.type_of_user === 'Advertiser') {
        payload.advertiserId = user?.id;
      }

      const response = await fetch(`${domainName}/api/strategy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log('response data:-  ', response);
      if (response.ok) {
        console.log('Setting strategyId cookie:', strategy_id_data);
        Cookies.set('strategyId', strategy_id_data, { expires: 7, path: '/' });
        console.log('Cookie set successfully');
        const updatedCampaign = await response.json();
        console.log('Campaign updated successfully:', updatedCampaign);
        localStorage.setItem('strategy', JSON.stringify(`strategy-created`));
        setGetBugOfRes(updatedCampaign);
        location.reload();
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  console.log('audience location is :- ', audience_location);

  console.log({
    userId: user?.id,
    ageRange: selectedTab,
    gender: selectedGender,
    screens: selectedDevice,
    audiences: audienceArr,
    strategyName: strategyName,
    strategyDailyBudget: strategyDailyBudget,
    selectedGoal: selectedGoal,
    selectedOption: selectedOption,
    selectedChannels: selectedChannels,
    deliveryTimeSlots: daySettings,
    deliveryType: deliveryTypeval,
    campaignId: campaignInfo[campaignInfo.length - 1]?.campaignId,
  });

  // for Cookie parsing

  useEffect(() => {
    if (strategyData) {
      setSelectedTab(strategyData.ageRange || '18-20');
      setSelectedGender(strategyData.gender || 'Women');
      setSelectedDevice(strategyData.screens || 'TV');
      setAudienceArr(strategyData.audiences || []);
      setStrategyName(strategyData.strategyName || '');
      setStrategyDailyBudget(strategyData.strategyDailyBudget || '');
      setAudienceLocation(strategyData.audienceLocation || '');
      setUploadedFileName(strategyData.creatives);
      setMediaType(strategyData.mediaType || 'video');
      setVideoDuration(
        strategyData.mediaType === 'video' ? strategyData.duration : null,
      );
      setDeliveryType(strategyData.deliveryType);
      setSelectedOption(strategyData.selectedOption);
      setSelectedGoal(strategyData.selectedGoal);
      setTargetedAgeGroups(strategyData.targetedAgeGroups || []); //Added for targeted age groups
      setTargetedIPs(strategyData.targetedIPs || []); //Added for targeted IPs
    }
  }, [strategyData]);
  console.log('delivery type :- ', deliveryTypeval);

  const [campaigns, setCampaigns] = useState<any>();
  const [strategies, setStrategies] = useState<any>();
  //for Strategy Daily budget
  const [dailyBudget, setDailyBudget] = useState<string>(' ');

  useEffect(() => {
    const campaign_id = Cookies.get('campaignId');
    const strategy_id = Cookies.get('strategyId');
    const fetchcampaignData = async () => {
      try {
        const response = await axios.get(
          `${domainName}/api/get-campaign?campaignId=${campaign_id}`,
        );
        console.log('previous campaign data:- ', response.data);
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }
    };
    const fetcstrategyData = async () => {
      try {
        const response = await axios.get(
          `${domainName}/api/get-strategy?strategyId=${strategy_id}`,
        );
        console.log('previous strategy data:- ', response.data);
        setStrategies(response.data);
      } catch (error) {
        console.error('Error fetching strategy data:', error);
      }
    };
    fetchcampaignData();
    fetcstrategyData();
    console.log(campaigns);
  }, []);

  useEffect(() => {
    if (campaigns) {
      setDailyBudget(campaigns?.campaignBudget);
    }
  }, [campaigns]);

  console.log(strategies);
  console.log(campaigns);
  console.log(campaigns?.campaignBudget);
  console.log(dailyBudget);

  const fetchLocationIPs = async (location: string) => {
    try {
      const response = await fetch(
        `${domainName}/api/location-ips?location=${encodeURIComponent(
          location,
        )}`,
      );
      if (!response.ok) {
        throw new Error('Failed to fetch IP addresses');
      }
      const data = await response.json();
      setLocationIPs(data.ips);
      setTargetedIPs(data.ips); // Automatically set all fetched IPs as targeted
      setIpsFetched(true); // Set ipsFetched to true after successful fetch
    } catch (error) {
      console.error('Error fetching IP addresses:', error);
      // Handle error (e.g., show an error message to the user)
      setIpsFetched(false); // Set ipsFetched to false if there's an error
    }
  };

  const handleAgeGroupSelection = (ageGroup: string) => {
    setSelectedTab(ageGroup);
    if (targetedAgeGroups.includes(ageGroup)) {
      setTargetedAgeGroups(
        targetedAgeGroups.filter((group) => group !== ageGroup),
      );
    } else {
      setTargetedAgeGroups([...targetedAgeGroups, ageGroup]);
    }
  };

  const handleAgeVerification = (isInTargetGroup: boolean) => {
    setIsAgeVerified(isInTargetGroup);
    // Here you would typically trigger the ad display if isInTargetGroup is true
  };

  return (
    <>
      <Breadcrumb pageName="Strategy" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex gap-2 items-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <GiBrain className="text-[20px]" />
              <h3 className="text-blue-900 font-semibold text-[20px] dark:text-white">
                Strategy Name
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <input
                  onChange={(e) => setStrategyName(e.target.value)}
                  type="text"
                  value={strategyName}
                  placeholder="Default Input"
                  className="mt-1 p-2 block w-full px-3 py-2 rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white shadow-md outline-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

          {/* <!-- Time and date --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="text-blue-900 font-semibold text-[20px] dark:text-white  flex items-center gap-2">
                <FaSearchDollar className="text-[20px]" />
                Strategy Daily Budget
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5 text-center">
              <div className="flex items-center">
                <p className="mt-1 relative left-10 p-2 block py-2 rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white  outline-none">
                  ₹
                </p>
                <input
                  onChange={(e) => setStrategyDailyBudget(e.target.value)}
                  type="text"
                  value={strategyDailyBudget}
                  placeholder="5000"
                  className="mt-1 ml-5 pl-6 p-2 block w-[75%] py-2 rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white shadow-md outline-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
              <p className="font-semibold text-[15px] text-blue-900 dark:text-white transition duration-500">
                {' '}
                You have remaining : ₹
                {Number(
                  campaigns?.campaignAdvertiserBudget - strategyDailyBudget,
                ) < 0
                  ? '0'
                  : campaigns?.campaignAdvertiserBudget - strategyDailyBudget}
              </p>
            </div>
          </div>
          {/* <!-- File upload --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className=" flex gap-2 item-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <LuHeartHandshake className="text-[20px]" />
              <h3 className="text-blue-900 font-semibold text-[20px] dark:text-white  flex items-center gap-2">
                Ages
              </h3>
            </div>
            <div className="flex flex-col gap-5 p-6.5 overflow-hidden mx-1 sm:text-[10px] text-blue-900 font-semibold md:text-[15px] dark:text-white ">
              <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="flex flex-col justify-between "
              >
                <TabsList className="space-x-4 ">
                  {[
                    '18-20',
                    '21-24',
                    '25-34',
                    '35-44',
                    '45-54',
                    '55-64',
                    '64+',
                  ].map((ageGroup) => (
                    <TabsTrigger
                      key={ageGroup}
                      value={ageGroup}
                      className={`px-4 py-2 rounded-lg transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 ${
                        targetedAgeGroups.includes(ageGroup)
                          ? 'bg-primary text-white'
                          : 'data-[state=active]:bg-accent data-[state=active]:text-accent-foreground'
                      }`}
                      onClick={() => handleAgeGroupSelection(ageGroup)}
                    >
                      {ageGroup}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">
                  Selected Age Groups for Targeting:
                </h3>
                {targetedAgeGroups.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {targetedAgeGroups.map((ageGroup) => (
                      <span
                        key={ageGroup}
                        className="bg-primary text-white px-2 py-1 rounded"
                      >
                        {ageGroup}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p>No age groups selected for targeting.</p>
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  variant={'ghost'}
                  className="text-black gap-2 dark:text-white font-semibold"
                  onClick={handleReset}
                >
                  <Redo2 /> Reset
                </Button>
              </div>
            </div>
          </div>
          {/* {isScrollingDown && (
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-boxdark shadow-md flex justify-center">
              <Button variant={'outline'} className="gap-2">
                <ArrowUp /> Back to campaign settings
              </Button>
              <Button variant={'outline'} disabled>
                Continue to Summary
              </Button>
            </div>
          )} */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex gap-1 item-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <FaGenderless className="text-[22px]" />
              <h3 className="text-blue-900 font-semibold text-[20px] dark:text-white">
                Genders
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <Tabs
                value={selectedGender}
                onValueChange={setSelectedGender}
                className="flex flex-col justify-between"
              >
                <TabsList className="space-x-4">
                  <TabsTrigger
                    value="women"
                    className="p-9 py-2 mr-8 text-[18px] rounded-lg transition-colors font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Women
                  </TabsTrigger>
                  <TabsTrigger
                    value="men"
                    className="px-9 py-2 ml-8 text-[18px] rounded-lg transition-colors font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Men
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex justify-end">
                <Button
                  variant={'ghost'}
                  className="text-black gap-2 dark:text-white font-semibold"
                  onClick={handleReset}
                >
                  <Redo2 /> Reset
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex gap-2 item-center border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <FaPeopleArrows className="text-[20px]" />
              <h3 className="text-blue-900 font-semibold text-[20px] dark:text-white">
                Audiences
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5 ">
              <div>
                <label className="mb-3 block  text-blue-900 font-semibold text-[15px] dark:text-white">
                  <h1 className="font-semibold">Predefined audiences</h1>
                  <p>Target audiences from their points of interest</p>
                </label>
                <input
                  type="text"
                  placeholder="🔍 Search for audience criteria"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-5.5 p-6.5 overflow-y-scroll h-[50vh] pb-2">
                <CheckboxOne
                  text="Arts & Entertainment"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Arts & Entertainment')}
                />
                {/* {selectedCheckbox === 'Arts & Entertainment' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Books & Literature" />
                  <CheckboxOne text="Celebrity Fan/Gossip" />
                  <CheckboxOne text="Fine Art" />
                  <CheckboxOne text="Humor" />
                  <CheckboxOne text="Movies" />
                  <CheckboxOne text="Music" />
                  <CheckboxOne text="Television" />
                </div>
              )} */}

                <CheckboxOne
                  text="Automotive"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Automotive')}
                />
                {/* {selectedCheckbox === 'Automotive' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Auto Parts" />
                  <CheckboxOne text="Auto Repair" />
                  <CheckboxOne text="Buying/Selling Cars" />
                  <CheckboxOne text="Car Culture" />
                  <CheckboxOne text="Certified Pre-Owned" />
                  <CheckboxOne text="Convertible" />
                  <CheckboxOne text="Coupe" />
                  <CheckboxOne text="Crossover" />
                  <CheckboxOne text="Diesel" />
                  <CheckboxOne text="Electric Vehicle" />
                  <CheckboxOne text="Hatchback" />
                  <CheckboxOne text="Hybrid" />
                  <CheckboxOne text="Luxury" />
                  <CheckboxOne text="Minivan" />
                  <CheckboxOne text="Motorcycles" />
                  <CheckboxOne text="Off-Road Vehicles" />
                  <CheckboxOne text="Permanent Vehicles" />
                  <CheckboxOne text="Pickup" />
                  <CheckboxOne text="Road-Side Assistance" />
                  <CheckboxOne text="Sedan" />
                  <CheckboxOne text="Trucks & Accessories" />
                  <CheckboxOne text="Vintage Cars" />
                  <CheckboxOne text="Wagon" />
                </div>
              )} */}
                <CheckboxOne
                  text="Business"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Business')}
                />
                {/* {selectedCheckbox === 'Business' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Advertising" />
                  <CheckboxOne text="Agriculture" />
                  <CheckboxOne text="Biotech/Biomedical" />
                  <CheckboxOne text="Business Software" />
                  <CheckboxOne text="Construction" />
                  <CheckboxOne text="Forestry" />
                  <CheckboxOne text="Government" />
                  <CheckboxOne text="Green Solutions" />
                  <CheckboxOne text="Human Resources" />
                  <CheckboxOne text="Logistics" />
                  <CheckboxOne text="Marketing" />
                  <CheckboxOne text="Metals" />
                </div>
              )} */}
                <CheckboxOne
                  text="Careers"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Careers')}
                />
                {/* {selectedCheckbox === 'Careers' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Career Planning" />
                  <CheckboxOne text="College" />
                  <CheckboxOne text="Financial Aid" />
                  <CheckboxOne text="Job Fairs" />
                  <CheckboxOne text="Job Search" />
                  <CheckboxOne text="Resume Writing/Advice" />
                  <CheckboxOne text="Nursing" />
                  <CheckboxOne text="Scholarships" />
                  <CheckboxOne text="Telecommuting" />
                  <CheckboxOne text="Career Advice" />
                </div>
              )} */}
                <CheckboxOne
                  text="Education"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Education')}
                />
                {/* {selectedCheckbox === 'Education' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="7-12 Education" />
                  <CheckboxOne text="Adult Education" />
                  <CheckboxOne text="Art History" />
                  <CheckboxOne text="College Administration" />
                  <CheckboxOne text="College Life" />
                  <CheckboxOne text="Distance Learning" />
                  <CheckboxOne text="English as a 2nd Language" />
                  <CheckboxOne text="Language Learning" />
                  <CheckboxOne text="Graduate School" /><continuation_point>
                  <CheckboxOne text="Graduate School" />
                  <CheckboxOne text="Homeschooling" />
                  <CheckboxOne text="Homwork/Study Tips" />
                  <CheckboxOne text="K-6 Educators" />
                  <CheckboxOne text="Private School" />
                  <CheckboxOne text="Special Education" />
                  <CheckboxOne text="Studying Business" />
                </div>
              )} */}
                <CheckboxOne
                  text="Family & Parenting"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Family & Parenting')}
                />
                {/* {selectedCheckbox === 'Family & Parenting' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Adoption" />
                  <CheckboxOne text="Babies & Toddlers" />
                  <CheckboxOne text="Daycare/Pre School" />
                  <CheckboxOne text="Family Intent" />
                  <CheckboxOne text="Parenting -K-6 Kids" />
                  <CheckboxOne text="Parenting teens" />
                  <CheckboxOne text="Pregnancy" />
                  <CheckboxOne text="Special Needs Kids" />
                  <CheckboxOne text"Eldcare" />
                </div>
              )} */}
                <CheckboxOne
                  text="Health & Fitness"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Health & Fitness')}
                />
                {/* {selectedCheckbox === 'Health & Fitness' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Exercise" />
                  <CheckboxOne text="ADD" />
                  <CheckboxOne text="AIDS/HIV" />
                  <CheckboxOne text="Allergies" />
                  <CheckboxOne text="Alternative Medicine" />
                  <CheckboxOne text="Arthritis" />
                  <CheckboxOne text="Asthma" />
                  <CheckboxOne text="Autism/PDD" />
                  <CheckboxOne text="Bipolar Disorder" />
                  <CheckboxOne text="Brain Tumor" />
                  <CheckboxOne text="Cancer" />
                  <CheckboxOne text="Cholesterol" />
                  <CheckboxOne text="Chronic Fatigue Syndrome" />
                  <CheckboxOne text="Chronic Pain" />
                  <CheckboxOne text="Deafness" />
                  <CheckboxOne text="Dental Care" />
                  <CheckboxOne text="Depression" />
                  <CheckboxOne text="Dermatology" />
                  <CheckboxOne text="Diabetes" />
                  <CheckboxOne text="Epilepsy" />
                  <CheckboxOne text="GERD/Acid Reflux" />
                  <CheckboxOne text="Headaches/Migraines" />
                  <CheckboxOne text="Heart Disease" />
                  <CheckboxOne text="Herbs for Health" />
                  <CheckboxOne text="Holistic Healing" />
                  <CheckboxOne text="IBS/Crohn’s Disease" />
                  <CheckboxOne text="Incest/Abuse Support" />
                  <CheckboxOne text="Incontinence" />
                  <CheckboxOne text="Infertility" />
                  <CheckboxOne text="Men’s Health" />
                  <CheckboxOne text="Nutrition" />
                  <CheckboxOne text="Orthopedics" />
                  <CheckboxOne text="Panic/Anxiety Disorders" />
                  <CheckboxOne text="Pediatrics" />
                  <CheckboxOne text="Physical Therapy" />
                  <CheckboxOne text="Psychology/Psychiatry" />
                  <CheckboxOne text="Senior Health" />
                  <CheckboxOne text="Sexuality" />
                  <CheckboxOne text="Sleep Disorders" />
                  <CheckboxOne text="Smoking Cessation" />
                  <CheckboxOne text="Substance Abuse" />
                  <CheckboxOne text="Thyroid Disease" />
                  <CheckboxOne text="Weight Loss" />
                  <CheckboxOne text="Women's Health" />
                </div>
              )} */}

                <CheckboxOne
                  text="Hobbies & Interests"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Hobbies & Interests')}
                />
                {/* {selectedCheckbox === 'Hobbies & Interests' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Art/Technology" />
                  <CheckboxOne text="Arts & Crafts" />
                  <CheckboxOne text="Beadwork" />
                  <CheckboxOne text="Bird-Watching" />
                  <CheckboxOne text="Board Games/Puzzles" />
                  <CheckboxOne text="Candle & Soap Making" />
                  <CheckboxOne text="Cuisine-Specific" />
                  <CheckboxOne text="Card Games" />
                  <CheckboxOne text="Chess" />
                  <CheckboxOne text="Cigars" />
                  <CheckboxOne text="Collecting" />
                  <CheckboxOne text="Comic Books" />
                  <CheckboxOne text="Drawing/Sketching" />
                  <CheckboxOne text="Freelance Writing" />
                  <CheckboxOne text="Genealogy" />
                  <CheckboxOne text="Getting Published" />
                  <CheckboxOne text="Guitar" />
                  <CheckboxOne text="Home Recording" />
                  <CheckboxOne text="Investors & Patents" />
                  <CheckboxOne text="Jewelry Making" />
                  <CheckboxOne text="Magic & Illusion" />
                  <CheckboxOne text="Needlework" />
                  <CheckboxOne text="Painting" />
                  <CheckboxOne text="Photography" />
                  <CheckboxOne text="Radio" />
                  <CheckboxOne text="Roleplaying Games" />
                  <CheckboxOne text="Sci-Fi & Fantasy" />
                  <CheckboxOne text="Scrapbooking" />
                  <CheckboxOne text="Screenwriting" />
                  <CheckboxOne text="Stamps & Coins" />
                  <CheckboxOne text="Video & Computer Games" />
                  <CheckboxOne text="Woodworking" />
                </div>
              )} */}
                <CheckboxOne
                  text="Home & Garden"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Home & Garden')}
                />
                {/* {selectedCheckbox === 'Home & Garden' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Appliances" />
                  <CheckboxOne text="Entertaining" />
                  <CheckboxOne text="Environmental Safety" />
                  <CheckboxOne text="Gardening" />
                  <CheckboxOne text="Home Repair" />
                  <CheckboxOne text="Home Theater" />
                  <CheckboxOne text="Interior Decorating" />
                  <CheckboxOne text="Landscaping" />
                  <CheckboxOne text="Remodeling & Construction" />
                </div>
              )} */}
                <CheckboxOne
                  text="Law, Government, & Politics"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Law, Government, & Politics')}
                />
                {/* {selectedCheckbox === 'Law, Government, & Politics' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Immigration" />
                  <CheckboxOne text="Legal Issues" />
                  <CheckboxOne text="U.S. Government Resources" />
                  <CheckboxOne text="Politics" />
                  <CheckboxOne text="Commentary" />
                </div>
              )} */}
                <CheckboxOne
                  text="News"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('News')}
                />
                {/* {selectedCheckbox === 'News' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="International News" />
                  <CheckboxOne text="National News" />
                  <CheckboxOne text="Local News" />
                </div>
              )} */}
                <CheckboxOne
                  text="Personal Finance"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Personal Finance')}
                />
                {/* {selectedCheckbox === 'Personal Finance' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Beginning Investing" />
                  <CheckboxOne text="Credit/Debt & Loans" />
                  <CheckboxOne text="Financial News" />
                  <CheckboxOne text="Financial Planning" />
                  <CheckboxOne text="Hedge Fund" />
                  <CheckboxOne text="Insurance" />
                  <CheckboxOne text="Investing" />
                  <CheckboxOne text="Mutual Funds" />
                  <CheckboxOne text="Options" />
                  <CheckboxOne text="Retirement Planning" />
                  <CheckboxOne text="Stocks" />
                  <CheckboxOne text="Tax Planning" />
                </div>
              )} */}
                <CheckboxOne
                  text="Society"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Society')}
                />
                {/* {selectedCheckbox === 'Society' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Dating" />
                  <CheckboxOne text="Divorce Support" />
                  <CheckboxOne text="Gay Life" />
                  <CheckboxOne text="Marriage" />
                  <CheckboxOne text="Senior Living" />
                  <CheckboxOne text="Teens" />
                  <CheckboxOne text="Weddings" />
                  <CheckboxOne text="Ethnic Specific" />
                </div>
              )} */}
                <CheckboxOne
                  text="Science"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Science')}
                />
                {/* {selectedCheckbox === 'Science' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Astrology" />
                  <CheckboxOne text="Biology" />
                  <CheckboxOne text="Chemistry" />
                  <CheckboxOne text="Geology" />
                  <CheckboxOne text="Paranormal Phenomena" />
                  <CheckboxOne text="Physics" />
                  <CheckboxOne text="Space/Astronomy" />
                  <CheckboxOne text="Geography" />
                  <CheckboxOne text="Botany" />
                  <CheckboxOne text="Weather" />
                </div>
              )} */}
                <CheckboxOne
                  text="Pets"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Pets')}
                />
                {/* {selectedCheckbox === 'Pets' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Aquariums" />
                  <CheckboxOne text="Birds" />
                  <CheckboxOne text="Cats" />
                  <CheckboxOne text="Dogs" />
                  <CheckboxOne text="Large Animals" />
                  <CheckboxOne text="Reptiles" />
                  <CheckboxOne text="Veterinary Medicine" />
                </div>
              )} */}
                <CheckboxOne
                  text="Sports"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Sports')}
                />
                {/* {selectedCheckbox === 'Sports' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Auto Racing" />
                  <CheckboxOne text="Baseball" />
                  <CheckboxOne text="Bicycling" />
                  <CheckboxOne text="Bodybuilding" />
                  <CheckboxOne text="Boxing" />
                  <CheckboxOne text="Canoeing/Kayaking" />
                  <CheckboxOne text="Cheerleading" />
                  <CheckboxOne text="Climbing" />
                  <CheckboxOne text="Cricket" />
                  <CheckboxOne text="Figure Skating" />
                  <CheckboxOne text="Fly Fishing" />
                  <CheckboxOne text="Football" />
                  <CheckboxOne text="Freshwater Fishing" />
                  <CheckboxOne text="Game & Fish" />
                  <CheckboxOne text="Golf" />
                  <CheckboxOne text="Horse Racing" />
                  <CheckboxOne text="Horses" />
                  <CheckboxOne text="Hunting/Shooting" />
                  <CheckboxOne text="Inline Skating" />
                  <CheckboxOne text="Martial Arts" />
                  <CheckboxOne text="Mountain Biking" />
                  <CheckboxOne text="NASCAR Racing" />
                  <CheckboxOne text="Olympics" />
                  <CheckboxOne text="Paintball" />
                  <CheckboxOne text="Power & Motorcycles" />
                  <CheckboxOne text="Pro Basketball" />
                  <CheckboxOne text="Pro Ice Hockey" />
                  <CheckboxOne text="Rodeo" />
                  <CheckboxOne text="Rugby" />
                  <CheckboxOne text="Running/Jogging" />
                  <CheckboxOne text="Sailing" />
                  <CheckboxOne text="Saltwater Fishing" />
                  <CheckboxOne text="Scuba Diving" />
                  <CheckboxOne text="Skateboarding" />
                  <CheckboxOne text="Snowboarding" />
                  <CheckboxOne text="Surfing/Body-Boarding" />
                  <CheckboxOne text="Swimming" />
                  <CheckboxOne text="Table Tennis/Ping-Pong" />
                  <CheckboxOne text="Tennis" />
                  <CheckboxOne text="Volleyball" />
                  <CheckboxOne text="Walking" />
                  <CheckboxOne text="Waterski/Wakeboard" />
                  <CheckboxOne text="World Soccer" />
                </div>
              )} */}
                <CheckboxOne
                  text="Style & Fashion"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Style & Fashion')}
                />
                {/* {selectedCheckbox === 'Style & Fashion' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Beauty" />
                  <CheckboxOne text="Body Art" />
                  <CheckboxOne text="Fashion" />
                  <CheckboxOne text="Jewelry" />
                  <CheckboxOne text="Clothing" />
                  <CheckboxOne text="Accessories" />
                </div>
              )} */}
                <CheckboxOne
                  text="Technology & Computing"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Technology & Computing')}
                />
                {/* {selectedCheckbox === 'Technology & Computing' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="3-D Graphics" />
                  <CheckboxOne text="Animation" />
                  <CheckboxOne text="Antivirus Software" />
                  <CheckboxOne text="C/C++" />
                  <CheckboxOne text="Cameras & Camcorders" />
                  <CheckboxOne text="Cell Phones" />
                  <CheckboxOne text="Computer Certification" />
                  <CheckboxOne text="Computer Networking" />
                  <CheckboxOne text="Computer Peripherals" />
                  <CheckboxOne text="Computer Reviews" />
                  <CheckboxOne text="Data Centers" />
                  <CheckboxOne text="Databases" />
                  <CheckboxOne text="Desktop Publishing" />
                  <CheckboxOne text="Desktop Video" />
                  <CheckboxOne text="Email" />
                  <CheckboxOne text="Graphics Software" />
                  <CheckboxOne text="Home Video/DVD" />
                  <CheckboxOne text="Internet Technology" />
                  <CheckboxOne text="Java" />
                  <CheckboxOne text="JavaScript" />
                  <CheckboxOne text="Mac Support" />
                  <CheckboxOne text="MP3/MIDI" />
                  <CheckboxOne text="Net Conferencing" />
                  <CheckboxOne text="Net for Beginners" />
                  <CheckboxOne text="Network Security" />
                  <CheckboxOne text="Palmtops/PDAs" />
                  <CheckboxOne text="PC Support" />
                  <CheckboxOne text="Portable" />
                  <CheckboxOne text="Entertainment" />
                  <CheckboxOne text="Shareware/Freeware" />
                  <CheckboxOne text="Unix" />
                  <CheckboxOne text="Visual Basic" />
                  <CheckboxOne text="Web Clip Art" />
                  <CheckboxOne text="Web Search" />
                  <CheckboxOne text="Windows" />
                </div>
              )} */}
                <CheckboxOne
                  text="Travel"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Travel')}
                />
                {/* {selectedCheckbox === 'Travel' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Adventure Trave" />
                  <CheckboxOne text="Africa" />
                  <CheckboxOne text="Air Travel" />
                  <CheckboxOne text="Australia & New Zealand" />
                  <CheckboxOne text="Bed & Breakfasts" />
                  <CheckboxOne text="Budget Travel" />
                  <CheckboxOne text="Business Travel" />
                  <CheckboxOne text="By US Locale" />
                  <CheckboxOne text="Camping" />
                  <CheckboxOne text="Canada" />
                  <CheckboxOne text="Caribbean" />
                  <CheckboxOne text="Cruises" />
                  <CheckboxOne text="Eastern Europe" />
                  <CheckboxOne text="Europe" />
                  <CheckboxOne text="France" />
                  <CheckboxOne text="Greece" />
                  <CheckboxOne text="Honeymoons/Getaways" />
                  <CheckboxOne text="Hotels" />
                  <CheckboxOne text="Italy" />
                  <CheckboxOne text="Japan" />
                  <CheckboxOne text="Mexico & Central America" />
                  <CheckboxOne text="National Parks" />
                  <CheckboxOne text="South America" />
                  <CheckboxOne text="Spas" />
                  <CheckboxOne text="Theme Parks" />
                  <CheckboxOne text="Traveling with Kids" />
                  <CheckboxOne text="United Kingdom" />
                </div>
              )} */}
                <CheckboxOne
                  text="Real Estate"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Real Estate')}
                />
                {/* {selectedCheckbox === 'Real Estate' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Apartments" />
                  <CheckboxOne text="Architects" />
                  <CheckboxOne text="Buying/Selling Homes" />
                </div>
              )} */}
                <CheckboxOne
                  text="Shopping"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Shopping')}
                />
                {/* {selectedCheckbox === 'Shopping' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Contests & Freebies" />
                  <CheckboxOne text="Couponing" />
                  <CheckboxOne text="Comparison" />
                  <CheckboxOne text="Engines" />
                </div>
              )} */}
                <CheckboxOne
                  text="Religion & Spirituality"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Religion & Spirituality')}
                />
                {/* {selectedCheckbox === 'Religion & Spirituality' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Alternative Religions" />
                  <CheckboxOne text="Atheism/Agnosticism" />
                  <CheckboxOne text="Buddhism" />
                  <CheckboxOne text="Catholicism" />
                  <CheckboxOne text="Christianity" />
                  <CheckboxOne text="Hinduism" />
                  <CheckboxOne text="Islam" />
                  <CheckboxOne text="Judaism" />
                  <CheckboxOne text="Latter-Day Saints" />
                  <CheckboxOne text="Pagan/Wiccan" />
                </div>
              )} */}
                <CheckboxOne
                  text="Uncategorized"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Uncategorized')}
                />
                <CheckboxOne
                  text="Non-Standard Conten"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes(
                    'Arts & EntertainmentNon-Standard Conten',
                  )}
                />
                {/* {selectedCheckbox === 'Non-Standard Content' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Unmoderated UGC" />
                  <CheckboxOne text="Extreme Graphic/Explicit Violence" />
                  <CheckboxOne text="Pornography" />
                  <CheckboxOne text="Profane Content" />
                  <CheckboxOne text="Hate Content" />
                  <CheckboxOne text="Under Construction" />
                  <CheckboxOne text="Incentivized" />
                </div>
              )} */}
                <CheckboxOne
                  text="Illegal Content"
                  className="text-blue-900 font-semibold text-[15px] dark:text-white"
                  onChange={(text, isChecked) =>
                    handleCheckboxChange(text, isChecked)
                  }
                  ischeck={audienceArr.includes('Illegal Content')}
                />
                {/* {selectedCheckbox === 'Illegal Content' && (
                <div className='ml-2 flex flex-col gap-2'>
                  <CheckboxOne text="Illegal Content" />
                  <CheckboxOne text="Warez" />
                  <CheckboxOne text="Spyware/Malware" />
                  <CheckboxOne text="Copyright Infringemen" />
                </div>
              )} */}
              </div>
              <div className="border-t border-stroke py-4 px-6.5 dark:border-strokedark">
                <div className="flex items-center gap-2 justify-between text-blue-900 font-semibold text-[15px] dark:text-white">
                  <h2>Audience located in</h2>
                  <button className="btn btn-outline">
                    Upload ZIP codes in bulk
                  </button>
                </div>
                <div className="mt-4 mb-4">
                  <InputSelect
                    onchange={(location) => {
                      setAudienceLocation(location);
                      fetchLocationIPs(location);
                    }}
                    value={audience_location}
                  />
                </div>
                {ipsFetched && (
                  <p className="mt-2 text-sm text-green-600">
                    IP addresses for this location have been fetched and will be
                    used for targeting.
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <Button
                  variant={'ghost'}
                  className="text-black gap-2 dark:text-white font-semibold"
                  onClick={handleReset}
                >
                  <Redo2 /> Reset
                </Button>
              </div>
            </div>
          </div>
          <div className="rounded-sm border text-blue-900 font-semibold  dark:text-white border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <Channels /> */}
            <Channels onSelectedChannelsChange={handleSelectedChannelsChange} />
          </div>
          <div className="rounded-sm border border-stroke text-blue-900 font-semibold  dark:text-white bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <DateSection
              deliveryType={setDeliveryType}
              daySettings={daySettings}
              onDaySettingsChange={handleDaySettingsChange}
              deliveryTypeval={deliveryTypeval}
            />
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-4 space-y-4">
              <div className="flex items-center space-x-2">
                <BsThunderboltFill className="h-5 w-5 text-primary" />
                <h2 className="text-blue-900 font-semibold text-[20px] dark:text-white">
                  Bidding
                </h2>
                <FaInfoCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {goals.map((goal) => (
                  <Card
                    key={goal.id}
                    className={`border-2 ${
                      selectedGoal === goal.id
                        ? 'border-primary'
                        : 'border-gray-300'
                    }`}
                    onClick={() => handleSelect(goal.id)}
                  >
                    <CardContent className="space-y-2 mt-2">
                      <div className="flex items-center space-x-2">
                        {goal.icon.map((Icon, index) => (
                          <Icon
                            key={index}
                            className={`h-5 w-5 ${
                              selectedGoal === goal.id
                                ? 'text-primary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <h3 className="text-base font-semibold">{goal.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {goal.description}
                      </p>
                      <a href="#" className="text-sm font-medium text-primary">
                        Learn more
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <RealTimeBidding
                strategyId={strategyData?.strategyId || `ST-${uuidv4()}`}
                initialBid={84.0}
                onBidChange={handleBidChange}
                biddingType={
                  selectedGoal === 'automatic' ? 'automatic' : 'manual'
                }
              />
              <div className="border-t border-stroke py-4 px-6.5 dark:border-strokedark">
                <div className="flex items-center space-x-2">
                  <h2 className="text-lg font-semibold">Advance Options</h2>
                  <FaInfoCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                {/* <SelectGroupOne /> */}
                <SelectGroupOne
                  label="Choose maximum ad frequency per household"
                  selected={selectedOption}
                  onSelect={handleSelectChange}
                />
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="mb-4">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Media Type
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    value={mediaType}
                    onChange={(e) =>
                      setMediaType(e.target.value as 'video' | 'banner')
                    }
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  >
                    <option value="video">Video</option>
                    <option value="banner">Banner</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
              {mediaType === 'video' ? (
                <VideoUpload
                  onURLSet={handleFileNameChange}
                  onVideoDuration={saveVideoDuration}
                  vidUrl={uploadedFileName || ''}
                />
              ) : (
                <BannerUpload onURLSet={handleFileNameChange} />
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="cursor-pointer p-2 rounded-lg text-white bg-blue-600 w-[10rem] hover:bg-slate-600 transition relative left-[50%] translate-x-[-50%]  mb-8"
            >
              Complete Strategy
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-9 md:absolute right-5 mb-4">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {/* <div className="flex flex-col gap-5.5 p-6.5 ">
              <RightSidedStrategyCard
                userId={String(userId)}
                ageRange={selectedTab}
                campaignId={campaignInfo[campaignInfo.length - 1]?.campaignId}
                gender={selectedGender}
                screens={selectedDevice}
                strategyName={strategyName}
                selectedGoal={selectedGoal}
                selectedOption={selectedOption}
                audiences={audienceArr}
              />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Strategy;
