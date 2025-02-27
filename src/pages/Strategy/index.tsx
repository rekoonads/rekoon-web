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
  const [selectedGender, setSelectedGender] = useState('Female');
  const [selectedDevice, setSelectedDevice] = useState('TV');
  const [selectedCheckbox, setSelectedCheckbox] = useState<string | null>(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  // const [audienceArr, setAudienceArr] = useState<string[]>([]);
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
    setSelectedGender('Female');
    setSelectedDevice('TV');
    setTargetedAgeGroups([]); // Reset targeted age groups
    setTargetedIPs([]); // Reset targeted IPs
  };

  // if(audienceArr.includes(text)){
  //   setSelectedCheckbox(text);
  //   setAudienceArr((prevState) => [...prevState, text]);
  // }
  const [searchTerm, setSearchTerm] = useState('');
  const [audienceArr, setAudienceArr] = useState([]);
  const [interestCounts, setInterestCounts] = useState([]);

  // const audiences = [
  //   'Arts & Entertainment',
  //   'Automotive',
  //   'Business',
  //   'Careers',
  //   'Education',
  //   'Family & Parenting',
  //   'Health & Fitness',
  //   'Hobbies & Interests',
  //   'Home & Garden',
  //   'Law, Government, & Politics',
  //   'News',
  //   'Personal Finance',
  //   'Society',
  //   'Science',
  //   'Pets',
  //   'Sports',
  //   'Style & Fashion',
  //   'Technology & Computing',
  //   'Travel',
  //   'Real Estate',
  //   'Shopping',
  //   'Religion & Spirituality',
  //   'Uncategorized',
  //   'Non-Standard Content',
  //   'Illegal Content',
  //   'Books',
  //   'Jewelry',
  //   'Electronics',
  //   'Outdoors',
  //   'Movies',
  //   'Beauty',
  //   'Clothing',
  //   'Games',
  //   'Garden',
  //   'Grocery',
  // ];

  // const handleCheckboxChange = (text, isChecked) => {
  //   if (isChecked) {
  //     setAudienceArr((prevState) => [...prevState, text]);
  //   } else {
  //     setAudienceArr((prevState) => prevState.filter((item) => item !== text));
  //   }
  // };

  // const filteredAudiences = audiences.filter((audience) =>
  //   audience.toLowerCase().includes(searchTerm.toLowerCase()),
  // );
  useEffect(() => {
    const fetchInterestCounts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/interests');
        setInterestCounts(response.data);
      } catch (error) {
        console.error('Error fetching interest counts:', error);
      }
    };

    fetchInterestCounts();
  }, []);

  const handleCheckboxChange = (text, isChecked) => {
    if (isChecked) {
      setAudienceArr((prevState) => [...prevState, text]);
    } else {
      setAudienceArr((prevState) => prevState.filter((item) => item !== text));
    }
  };

  const filteredAudiences = interestCounts.filter((interest) =>
    interest._id.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
      setSelectedGender(strategyData.gender || 'Female');
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
                    value="Female"
                    className="p-9 py-2 mr-8 text-[18px] rounded-lg transition-colors font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Female
                  </TabsTrigger>
                  <TabsTrigger
                    value="Male"
                    className="px-9 py-2 ml-8 text-[18px] rounded-lg transition-colors font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 data-[state=active]:bg-primary data-[state=active]:text-white"
                  >
                    Male
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
                <label className="mb-3 block text-blue-900 font-semibold text-[15px] dark:text-white">
                  <h1 className="font-semibold">Predefined audiences</h1>
                  <p>Target audiences from their points of interest</p>
                </label>
                <input
                  type="text"
                  placeholder="🔍 Search for audience criteria"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-5.5 p-6.5 overflow-y-scroll h-[50vh] pb-2">
                {filteredAudiences.map((interest) => (
                  <div
                    key={interest._id}
                    className="flex items-center justify-between"
                  >
                    <CheckboxOne
                      text={interest._id}
                      className="text-blue-900 font-semibold text-[15px] dark:text-white"
                      onChange={(text, isChecked) =>
                        handleCheckboxChange(text, isChecked)
                      }
                      ischeck={audienceArr.includes(interest._id)}
                    />
                    <span className="text-gray-500 dark:text-gray-400">
                      {interest.count}
                    </span>
                  </div>
                ))}
              </div>
              <h2>Audience located in</h2>
              <button className="btn btn-outline">
                Upload ZIP codes in bulk
              </button>
            </div>

            <div className="border-t border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="mt-4 mb-4">
                <InputSelect
                  onchange={(location) => {
                    setAudienceLocation(location);
                    fetchLocationIPs(location);
                  }}
                  value={audience_location}
                />
                {ipsFetched && (
                  <div className="flex justify-end">
                    <Button
                      variant={'ghost'}
                      className="text-black gap-2 dark:text-white font-semibold"
                      onClick={handleReset}
                    >
                      <Redo2 /> Reset
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
      </div>
    </>
  );
};

export default Strategy;
