import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { MoreVertical, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';

const domainName = import.meta.env.VITE_DOMAIN;

interface CampaignCardComponentProps {
  campaigns: any;
}

interface CampainAlreadyCreatedProps {
  backendCampaignData: any;
}

const CampaignCardComponent = ({ campaigns }: CampaignCardComponentProps) => {
  return (
    <div className="container mx-auto p-6 mt-6 bg-white shadow-xl text-left">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Campaign</h1>
          <p className="text-muted-foreground">
            Create campaigns and deliver your ads across channels.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center p-4 border-b">
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">
                Campaign Name: {campaigns?.campaignName}
              </h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-2">
                  <b>Draft</b>
                </span>
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {' '}
                  <b>From:</b> {campaigns?.startDate} - <b>To:</b>{' '}
                  {campaigns?.endDate}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Link to={'/campaign'}>
                <Button className="bg-black text-white mr-2 hover:bg-slate-700 ml-2">
                  Continue editing
                </Button>
              </Link>
              <Button variant={'outline'}>View reports</Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 p-4 text-sm">
            <div>
              <div className="font-medium">Daily Budget</div>
              <div className="text-2xl font-bold">
                ₹{campaigns?.campaignBudget}
              </div>
            </div>
            <div>
              <div className="font-medium">Spend</div>
              <div className="text-2xl font-bold">-</div>
            </div>
            <div>
              <div className="font-medium">Cost Per View</div>
              <div className="text-2xl font-bold">-</div>
            </div>
            <div>
              <div className="font-medium">Impressions</div>
              <div className="text-2xl font-bold">-</div>
            </div>
            <div>
              <div className="font-medium">Delivered on</div>
              <div className="text-2xl font-bold">-</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CampainAlreadyCreated = ({
  backendCampaignData,
}: CampainAlreadyCreatedProps) => {
  return (
    <div className="container mx-auto p-6 mt-6 bg-white shadow-xl text-left">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Campaign</h1>
          <p className="text-muted-foreground">
            Create campaigns and deliver your ads across channels.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center p-4 border-b">
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">
                Campaign Name: {backendCampaignData?.campaignName}
              </h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {' '}
                  <b>From:</b> {backendCampaignData?.startDate} - <b>To:</b>{' '}
                  {backendCampaignData?.endDate}
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <Button variant={'outline'}>View reports</Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-4 p-4 text-sm">
            <div>
              <div className="font-medium">Daily Budget</div>
              <div className="text-2xl font-bold">
                ₹{backendCampaignData?.campaignBudget}
              </div>
            </div>
            <div>
              <div className="font-medium">Spend</div>
              <div className="text-2xl font-bold">-</div>
            </div>
            <div>
              <div className="font-medium">Cost Per View</div>
              <div className="text-2xl font-bold">-</div>
            </div>
            <div>
              <div className="font-medium">Impressions</div>
              <div className="text-2xl font-bold">-</div>
            </div>
            <div>
              <div className="font-medium">Delivered on</div>
              <div className="text-2xl font-bold">-</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default function ManageCampaign() {
  const [campaigns, setCampaigns] = useState<any>();

  useEffect(() => {
    const campaign_id = Cookies.get('campaignId');
    // const strategy_id = Cookies.get('strategyId');
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
    // const fetcstrategyData = async () => {
    //   try {
    //     const response = await axios.get(
    //       `${domainName}/api/get-strategy?strategyId=${strategy_id}`,
    //     );
    //     console.log('previous strategy data:- ', response.data);
    //     setStrategies(response.data);
    //   } catch (error) {
    //     console.error('Error fetching strategy data:', error);
    //   }
    // };
    fetchcampaignData();
    // fetcstrategyData();
    console.log(campaigns);
  }, []);

  console.log(campaigns);

  //Feeding campaigns data to an array for further retrieval
  const [campArr, setCampArr] = useState<any>([]);
  useEffect(() => {
    if (campaigns) {
      setCampArr([campaigns]);
    }
  }, [campaigns]);

  // _____________________________________________________________________________________________________

  //getting the campaign data
  const { orgId, userId } = useAuth();
  const { user } = useUser();
  const [retrivedCampaignData, setRetrivedCampaignData] = useState<any>();
  const [isAdd, setIsAdd] = useState<string>('');
  const [user_data, setUser_data] = useState();
  //get the type of User

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
        setUser_data(data.user);
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
  console.log('user data', user_data);
  console.log(isAdd);

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

  

  return (
    <div className="flex flex-col gap-2 text-center">
      
      <div className="flex items-end  mt-10">
        {' '}
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white ml-9 ">
          <Link to={'/manage-advertise'}>Return to Dashboard</Link>
        </Button>
        <div className=" md:ml-[60%]">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white ml-13 ">
            <Link to={'/campaign'}>+ Create campaign</Link>
          </Button>
        </div>
      </div>
        <div className='flex flex-col items-center justify-center text-left mt-10 font-bold text-[30px] gap-3 '>
          <h2> Campaign Draft</h2>
          <div className='w-[30%] h-[1px] bg-slate-400'></div>
        </div>
      <>
        {campaigns && campArr ? (
          campArr.map((items, index) => (
            <CampaignCardComponent campaigns={items} key={index} />
          ))
        ) : (
          <b> No Campaign is in the Draft</b>
        )}
       
      </>
      <div className='flex flex-col items-center justify-center text-left mt-10 font-bold text-[30px] gap-3 '>
          <h2> Campaign Already Created ({retrivedCampaignData?.data.length})</h2>
          <div className='w-[30%] h-[1px] bg-slate-400'></div>
        </div>
      <div className="flex flex-col items-start justify-center text-center">
        {retrivedCampaignData
          ? Array.from(retrivedCampaignData?.data).map((item, index) => (
              <CampainAlreadyCreated backendCampaignData={item} key={index}  />
            ))
          : (<b> No Campaign yet created</b>)}
      </div>
    </div>
  );
}
