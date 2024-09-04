import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { MoreVertical, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const domainName = import.meta.env.VITE_DOMAIN;

interface CampaignCardComponentProps {
  campaigns: any;
}

const CampaignCardComponent = ({ campaigns }: CampaignCardComponentProps) => {
  return (
    <div className="container mx-auto p-6 mt-6 bg-white shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Campaigns</h1>
          <p className="text-muted-foreground">
            Create campaigns and deliver your ads across channels.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center p-4 border-b">
            <img
              src="/placeholder.svg?height=48&width=48"
              alt="Campaign thumbnail"
              width={48}
              height={48}
              className="rounded mr-4"
            />
            <div className="flex-grow">
              <h2 className="text-lg font-semibold">
                Campaign Name: {campaigns?.campaignName}
              </h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-2">Draft</span>
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {' '}
                  <b>From:</b> {campaigns?.startDate} - <b>To:</b>{' '}
                  {campaigns?.endDate}
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
              <div className="text-2xl font-bold">$100</div>
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end  mt-10">
        {' '}
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white ml-9 ">
          <Link to={'/manage-advertise'}>Return to Dashboard</Link>
        </Button>
        <div className=" md:ml-[60%]">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white ml-9 ">
            <Link to={'/campaign'}>+ Create campaign</Link>
          </Button>
          <Button className="bg-black text-white mr-2 hover:bg-slate-700 ml-2">
            Continue editing
          </Button>
        </div>
      </div>

      <>
        {campaigns && campArr ? (
          campArr.map((items, index) => (
            <CampaignCardComponent campaigns={items} key={index} />
          ))
        ) : (
          <b>No Campaign Data Available</b>
        )}
      </>
    </div>
  );
}
