import React, { useEffect } from 'react';
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
import { Apple, Earth } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { getAdvertiser } from '../../asyncCall/asyncCall';
import axios from 'axios';
import { useToast } from '../../components/ui/use-toast';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const Campaigns = () => {
  const [campaignName, setCampaignName] = useState('');
  const [campaignGoal, setCampaignGoal] = useState<String | null>(null);
  const [campaignType, setCampaignType] = useState('');
  const [advertiser, setAdvertiser] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectInput, setSelectInput] = useState<string>('');
  const [campaignBudget, setCampaignBudget] = useState('');
  const { user } = useUser();
  const [websiteName, setWebsiteName] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [businessEmail, setBusinessEmail] = useState<string>('');
  const [businessContact, setBusinessContact] = useState<string>('');
  const [update, setUpdate] = useState(false);
  const [received, setReceived] = useState(false);
  const navigate = useNavigate();
  const [postData, setPostData] = useState<any>();
  const { orgId, userId } = useAuth();
  console.log(user?.id);
  const domainName = import.meta.env.VITE_DOMAIN;
  const isIdAdvertOrAgent = orgId || userId;
  console.log(isIdAdvertOrAgent);
  const { toast } = useToast();
  const [modifiedCampaignBud, setModifiedCampaignBud] = useState<any>();
  // const secretKey = import.meta.env.VITE_ENCRYPT_SECRET_KEY;

  // searches for the type of user
  const [isAdd, setIsAdd] = useState<string>('');
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
  console.log(isAdd?.type_of_user);

  const [campaigndata, setcampaigndata] = useState<any>(null);
  useEffect(() => {
    const cookies_data = Cookies.get('campaignId');
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${domainName}/api/get-campaign?campaignId=${cookies_data}`,
        );
        console.log('previous campaign data:- ', response.data);
        setcampaigndata(response.data);
      } catch (error) {
        console.error('Error fetching campaign data:', error);
      }
    };
    if (cookies_data) {
      setUpdate(true);
      fetchUserData();
    } else {
      setUpdate(false);
    }
  }, []);
  const convertToYMD = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    if (campaigndata) {
      setCampaignName(campaigndata.campaignName);
      setCampaignGoal(campaigndata.campaignGoal);
      setCampaignType(campaigndata.campaignType);
      setAdvertiser(campaigndata.advertiserId);
      const convertedstart = convertToYMD(campaigndata.startDate);
      const convertedend = convertToYMD(campaigndata.endDate);
      setStartDate(convertedstart);
      setEndDate(convertedend);
      setCampaignBudget(campaigndata.campaignAdvertiserBudget);
      setWebsiteName(campaigndata.website.websiteName);
      setWebsite(campaigndata.website.websiteUrl);
      setBusinessEmail(campaigndata.website.websiteEmail);
      setBusinessContact(campaigndata.website.websiteContact);
      setCap(false);
    }
  }, [campaigndata]);

  //getting The advertiser's Data
  const [addData, setAddData] = useState<string>('');
  useEffect(() => {
    if (isAdd?.type_of_user === 'Advertiser' && user?.id) {
      const fetchingData = async () => {
        try {
          const adData = await getAdvertiser(user.id);
          console.log(adData);
          setAddData(adData);
        } catch (error) {
          console.log(error);
        }
      };
      fetchingData();
    }
  }, [isAdd, user?.id]);
  console.log(addData?.advertiserId);

  //for debugging
  console.log(campaignName);
  console.log(campaignGoal);
  console.log(websiteName);
  console.log(campaignBudget || advertiser);
  console.log(campaignType);
  console.log(startDate);
  console.log(endDate);
  console.log(website);
  console.log(businessContact);
  console.log(businessEmail);

  //Advertiser problem Solution
  const [modifiedAdvertiserBudget, setModifiedAdvertiserBudget] =
    useState<string>('');
  useEffect(() => {
    if (campaignBudget != '') {
      setModifiedAdvertiserBudget(String(campaignBudget));
    } else if (advertiser !== '') {
      setModifiedAdvertiserBudget(String(advertiser));
    }
  }, [campaignBudget, advertiser]);

  console.log(modifiedAdvertiserBudget);

  //handling Submission
  //   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //     event.preventDefault();
  //     console.log(`Normal Click`)
  //     if (campaignBudget && advertiser && startDate && endDate && campaignType) {
  //       console.log('Clicked after fully form submission')
  //     if (advertiser > '5000') {
  //       const cookievalue = Cookies.get('campaignId');
  //       if(cookievalue === undefined){
  //         const campaign_id = `CAM-${uuidv4()}`;
  //         if (isAdd?.type_of_user === 'Agency') {
  //           try {
  //             const response = await fetch(`${domainName}/api/campaigns`, {
  //               method: 'POST',
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //               body: JSON.stringify({
  //                 userId: user?.id,
  //                 campaignId: campaign_id,
  //                 agencyId: orgId,
  //                 campaignName,
  //                 campaignGoal,
  //                 website: {
  //                   websiteName,
  //                   websiteUrl: website,
  //                   websiteContact: businessContact,
  //                   websiteEmail: businessEmail,
  //                 },
  //                 campaignAdvertiserBudget: advertiser,
  //                 campaignBudget,
  //                 campaignType,
  //                 startDate: startDate?.toDateString(),
  //                 endDate: endDate?.toDateString(),
  //               }),
  //             });

  //             const data = await response.json();
  //             if (response.ok) {
  //               console.log('Campaign created successfully:', data);
  //               setReceived(true);
  //               toast({ title: 'Campaign Created Successfully' });
  //               navigate('/strategy');
  //             } else {
  //               console.error('Failed to create campaign:', data);
  //               toast({ title: 'Failed to submit campaign.' });
  //             }
  //           } catch (error) {
  //             console.error('Error:', error);
  //             toast({
  //               title: 'An error occurred while submitting the campaign.',
  //             });
  //           }
  //         } else if (isAdd?.type_of_user === 'Advertiser') {
  //           try {
  //             const response = await fetch(`${domainName}/api/campaigns`, {
  //               method: 'POST',
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //               body: JSON.stringify({
  //                 userId: user?.id,
  //                 campaignId: `CAM-${uuidv4()}`,
  //                 advertiserId: addData?.advertiserId,
  //                 campaignName,
  //                 campaignGoal,
  //                 website: {
  //                   websiteName,
  //                   websiteUrl: website,
  //                   websiteContact: businessContact,
  //                   websiteEmail: businessEmail,
  //                   advertiserId: addData?.advertiserId,
  //                   createdBy: user?.id,
  //                 },
  //                 campaignAdvertiserBudget: advertiser,
  //                 campaignBudget,
  //                 campaignType,
  //                 startDate: startDate?.toDateString(),
  //                 endDate: endDate?.toDateString(),
  //               }),
  //             });
  //             const data = await response.json();
  //             if (response.ok) {
  //               Cookies.set('campaignId', campaign_id, { expires: 7 });
  //               console.log('Campaign created successfully:', data);
  //               setReceived(true);
  //               toast({ title: 'Campaign Created Successfully' });
  //               navigate('/strategy');
  //             } else {
  //               console.error('Failed to create campaign:', data);
  //               toast({ title: 'Failed to submit campaign.' });
  //             }
  //           } catch (error) {
  //             console.error('Error:', error);
  //             toast({ title: 'An error occurred while submitting the campaign.' });
  //           }
  //         }
  //       } else {
  //         alert('Please deposit ₹5000 or greater');
  //         toast({ title: 'Please deposit ₹5000 or greater' });
  //       }
  //     } else {
  //       toast({ title: `Please Fill up the complete Campaign form` });
  //       alert(`Please Fill up the complete Campaign form`);
  //     }

  //     if (campaignBudget && advertiser && startDate && endDate && campaignType) {
  //       try {
  //         let postData: any;
  //         if (isAdd?.type_of_user === 'Agency') {
  //           postData = await axios.post(
  //             `${domainName}/api/add-website`,
  //             {
  //               websiteName,
  //               websiteUrl: website,
  //               websiteContact: businessContact,
  //               websiteEmail: businessEmail,
  //               agencyId: orgId,
  //               createdBy: user?.id,
  //             },
  //             {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //             },
  //           );
  //           setPostData(postData);
  //         } else if (isAdd?.type_of_user === 'Advertiser') {
  //           postData = await axios.post(
  //             `${domainName}/api/add-website`,
  //             {
  //               websiteName,
  //               websiteUrl: website,
  //               websiteContact: businessContact,
  //               websiteEmail: businessEmail,
  //               advertiserId: addData?.advertiserId,
  //               createdBy: user?.id,
  //             },
  //             {
  //               headers: {
  //                 'Content-Type': 'application/json',
  //               },
  //             },
  //           );
  //           setPostData(postData);
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //       if (postData) {
  //         alert(`The Website Details has been Submitted`);
  //       }
  //     }
  //   }
  //   console.log(`Click without submission`)
  // };

  //handling Submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (startDate && endDate && campaignType) {
      if (Number(modifiedAdvertiserBudget) >= 5000) {
        let previous_campaignId;
        if (update) {
          previous_campaignId = campaigndata.campaignId;
        }
        const campignid = previous_campaignId || `CAM-${uuidv4()}`;
        // const encrypt_id = CryptoJS.AES.encrypt(campignid, secretKey).toString();
        if (isAdd?.type_of_user === 'Agency') {
          try {
            const response = await fetch(`${domainName}/api/campaigns`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: user?.id,
                campaignId: campignid,
                agencyId: orgId,
                campaignName,
                campaignGoal,
                website: {
                  websiteName,
                  websiteUrl: website,
                  websiteContact: businessContact,
                  websiteEmail: businessEmail,
                },
                campaignAdvertiserBudget: modifiedAdvertiserBudget,
                campaignBudget: modifiedCampaignBud,
                campaignType,
                startDate: startDate,
                endDate: endDate,
              }),
            });

            const data = await response.json();
            if (response.ok) {
              Cookies.set('campaignId', campignid, { expires: 7 });
              console.log('Campaign created successfully:', data);
              setReceived(true);
              localStorage.setItem(`campaign`, JSON.stringify(`campaign-created`))
              toast({ title: 'Campaign Created Successfully' });
              location.reload()
             
            } else {
              console.error('Failed to create campaign:', data);
              toast({ title: 'Failed to submit campaign.' });
            }
          } catch (error) {
            console.error('Error:', error);
            toast({
              title: 'An error occurred while submitting the campaign.',
            });
          }
        } else if (isAdd?.type_of_user === 'Advertiser') {
          try {
            const response = await fetch(`${domainName}/api/campaigns`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: user?.id,
                campaignId: campignid,
                advertiserId: addData?.advertiserId,
                campaignName,
                campaignGoal,
                website: {
                  websiteName,
                  websiteUrl: website,
                  websiteContact: businessContact,
                  websiteEmail: businessEmail,
                  advertiserId: addData?.advertiserId,
                  createdBy: user?.id,
                },
                campaignAdvertiserBudget: modifiedAdvertiserBudget,
                campaignBudget: modifiedCampaignBud,
                campaignType,
                startDate: startDate,
                endDate: endDate,
              }),
            });

            const data = await response.json();
            if (response.ok) {
              Cookies.set('campaignId', campignid, { expires: 7 });
              console.log('Campaign created successfully:', data);
              setReceived(true);
              toast({ title: 'Campaign submitted successfully!' });
              localStorage.setItem(`campaign`, JSON.stringify(`campaign-created`))
              location.reload()
          
            } else {
              console.error('Failed to create campaign:', data);
              toast({
                title: 'An error occurred while submitting the campaign.',
              });
            }
          } catch (error) {
            console.error('Error:', error);
            toast({
              title: 'An error occurred while submitting the campaign.',
            });
          }
        }
      } else {
        alert('Please deposit ₹5000 or greater');
        toast({ title: 'Please deposit ₹5000 or greater' });
      }
      if (modifiedCampaignBud && startDate && endDate && campaignType) {
        try {
          let postData: any;
          if (isAdd?.type_of_user === 'Agency') {
            postData = await axios.post(
              `${domainName}/api/add-website`,
              {
                websiteName,
                websiteUrl: website,
                websiteContact: businessContact,
                websiteEmail: businessEmail,
                agencyId: orgId,
                createdBy: user?.id,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );
            setPostData(postData);
          } else if (isAdd?.type_of_user === 'Advertiser') {
            postData = await axios.post(
              `${domainName}/api/add-website`,
              {
                websiteName,
                websiteUrl: website,
                websiteContact: businessContact,
                websiteEmail: businessEmail,
                advertiserId: addData?.advertiserId,
                createdBy: user?.id,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );
            setPostData(postData);
          }
        } catch (error) {
          console.log(error);
        }
        if (postData) {
          alert(`The Website Details has been Submitted`);
        }
      }
    } else {
      toast({ title: `Please Fill up the complete Campaign form` });
      alert(`Please Fill up the complete Campaign form`);
    }
  };

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    setStartDate(dateValue);
  };

  const handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    setEndDate(dateValue);
  };

  console.log(advertiser);
  console.log(campaignBudget);
  console.log(campaignType);
  console.log(typeof advertiser);
  //Bug Fix for daily and Weekly budget

  console.log(modifiedCampaignBud);
  useEffect(() => {
    if (campaignBudget) {
      if (campaignType === 'Daily Budget') {
        setModifiedCampaignBud(campaignBudget);
      } else if (campaignType === 'Weekly Budget') {
        const weekly = Number(campaignBudget) * 7;
        setModifiedCampaignBud(String(weekly));
      }
    } else if (advertiser) {
      if (campaignType === 'Daily Budget') {
        setModifiedCampaignBud(advertiser);
      } else if (campaignType === 'Weekly Budget') {
        const weekly = Number(advertiser) * 7;
        setModifiedCampaignBud(String(weekly));
      }
    }
  }, [advertiser, campaignBudget, campaignType]);

  //button
  const [cap, setCap] = useState<boolean>(true);
  useEffect(() => {
    if (startDate && endDate && campaignType) {
      setCap(false);
    }
  }, [campaignBudget, advertiser, startDate, endDate, campaignBudget]);
  //For the Card Component
  const [cardWeeklyEstimate, setCardWeeklyEstimate] = useState<any>();
  const [cardDailyEstimate, setCardDailyEstimate] = useState<any>();

  useEffect(() => {
    if (campaignBudget) {
      setCardDailyEstimate(campaignBudget);
      const weekly = Number(campaignBudget) * 7;
      setCardWeeklyEstimate(String(weekly));
    } else if (advertiser !== '') {
      setCardDailyEstimate(String(advertiser));
      const weekly = Number(advertiser) * 7;
      setCardWeeklyEstimate(String(weekly));
    }
  }, [campaignBudget, advertiser]);

  console.log(cardDailyEstimate);
  console.log(cardWeeklyEstimate);

  return (
    <>
      <ToastContainer />
      <Breadcrumb pageName="Campaigns" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Campaign Name --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex items-center gap-2 border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <MdCampaign className="text-blue-900 font-semibold text-[20px] dark:text-white" />
              <h3 className="text-blue-900 font-semibold text-[20px] dark:text-white">
                Campaign Name
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-6 text-blue-900 font-semibold dark:text-white text-sm">
                  Name your campaign
                </label>
                <input
                  type="text"
                  placeholder="Default Input"
                  className="mt-1 p-2 block w-full px-3 py-2 rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white shadow-md outline-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* <!-- Campaign Goal --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="text-blue-900 font-semibold text-[20px] dark:text-white  flex items-center gap-2">
                <Apple className="text-[.5rem]" />
                Select Your campaign Goal
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5 ">
              <CampaignGoalSelector
                onSelect={(goal) => setCampaignGoal(goal)}
                Goal={campaignGoal}
              />
            </div>
          </div>
          {/* Add Website */}
          <div className="space-y-4 p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 text-[20px] dark:border-strokedark">
              <h3 className="text-blue-900 font-semibold  dark:text-white flex items-center gap-2 relative right-3">
                <Earth />
                Add Your Website Details
              </h3>
            </div>
            <div>
              <label className="mb-3 ml-2 text-blue-900 font-semibold dark:text-white text-sm">
                Name
              </label>
              <input
                type="text"
                value={websiteName}
                placeholder="Enter Name"
                className="mt-1 p-2 block w-full px-3 py-2 rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white shadow-md outline-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(event) => setWebsiteName(event.target.value)}
              />
            </div>
            <div>
              <label className="mb-3 ml-2 text-blue-900 font-semibold dark:text-white text-sm">
                Website
              </label>
              <input
                type="text"
                value={website}
                placeholder="www.yourbrand.com"
                className="mt-1 p-2 block w-full px-3 py-2 rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white shadow-md outline-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>
            <div>
              <label className="mb-3 ml-2 text-blue-900 font-semibold dark:text-white text-sm">
                Business Email
              </label>
              <input
                type="email"
                value={businessEmail}
                placeholder="Example@test.com"
                className="mt-1 p-2 block w-full px-3 py-2 rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white shadow-md outline-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(event) => setBusinessEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-3 ml-2 text-blue-900 font-semibold dark:text-white text-sm">
                Business Contact
              </label>
              <input
                type="text"
                value={businessContact}
                placeholder="www.yourbrand.com"
                className="mt-1 p-2 block w-full px-3 py-2 rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white shadow-md outline-none
      [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(event) => setBusinessContact(event.target.value)}
              />
            </div>
          </div>

          {/* <!-- Advertiser --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className=" flex items-center gap-2 border-b  border-stroke py-4 px-6.5 dark:border-strokedark">
              <FaAdversal className="text-blue-900 font-semibold  dark:text-white" />
              <h3 className="text-blue-900 font-semibold  dark:text-white">
                Advertiser
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <Advertiser
                onSelect={(adv) => setCampaignType(adv)}
                adBud={setAdvertiser}
                campBud={setCampaignBudget}
                budget={campaignBudget}
                campaignType={campaignType}
              />
            </div>
          </div>

          {/* <!-- Date Picker --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className=" flex items-center gap-2 border-b text-[20px] border-stroke py-4 px-6.5 dark:border-strokedark">
              <FaUserClock className="text-blue-900 font-semibold  dark:text-white" />
              <h3 className="text-blue-900 font-semibold  dark:text-white">
                Time and Date
              </h3>
            </div>
            <div className="flex gap-7 p-6.5 text-left">
              <div className="p-4 border rounded-2xl">
                <span className="mt-1 pl-2 w-full border-none outline-none rounded-md  text-blue-900 font-semibold  dark:text-white">
                  Start Date
                </span>
                <input
                  type="date"
                  name="start-date"
                  value={startDate}
                  className="mt-1 p-2 w-full border-none outline-none rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white"
                  onChange={handleStartDate}
                />
              </div>
              <div className="p-4  border rounded-2xl">
                <span className="mt-1 pl-2 w-full border-none outline-none rounded-md  text-blue-900 font-semibold  dark:text-white">
                  End Date
                </span>
                <input
                  type="date"
                  name="end-date"
                  value={endDate}
                  className="mt-1 p-2 w-full border-none outline-none rounded-md bg-slate-200 text-blue-900 font-semibold dark:bg-black dark:text-white"
                  onChange={handleEndDate}
                />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {/* {campaignBudget && advertiser && startDate && endDate && campaignType && (<button
              type="submit"
              className="cursor-pointer p-2 rounded-lg text-white bg-purple-900 hover:bg-purple-600 w-[80%] dark:bg-blue-900 dark:hover:bg-blue-500 active:scale-95  transition relative left-[50%] translate-x-[-50%] translate-y-[50%] mb-4"
            >
              Submit Campaign
            </button>) } */}
            <button
              disabled={cap}
              type="submit"
              className={`px-4 py-2 font-semibold text-white  p-2 rounded-lg   w-[80%] bg-slate-400  transition relative left-[50%] translate-x-[-50%] translate-y-[50%] mb-4 ${
                cap
                  ? 'bg-gray-400 cursor-not-allowed '
                  : 'dark:bg-blue-500 cursor-pointer dark:hover:bg-blue-700 active:scale-95  bg-purple-900 hover:bg-purple-600'
              }`}
              onClick={() => {
                if (!cap) {
                  console.log('Button clicked!');
                }
              }}
            >
              {update ? 'Update and ' : ''}{' '}
              {cap ? 'Fill up the Campaign From' : 'Proceed to Strategy'}
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-1 md:fixed right-5  h-[70vh]  ">
          <div className="rounded-sm border md:mr-10 md:mt-1 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            {startDate && endDate && campaignType && (
              <div className="md:mr-2">
                <RightSideCard
                  title="Campaign Budget"
                  dailyBudget={cardDailyEstimate}
                  weeklyEstimate={cardWeeklyEstimate}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Campaigns;
