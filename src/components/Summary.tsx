import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CalendarIcon, ClipboardPenIcon, PresentationIcon } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';

// Extend the Window interface
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentData {
  amount: number;
  currency: string;
  id: string;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function SummaryComponent() {
  const [amount, setAmount] = useState<number>();
  const { userId, orgId } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);
  const [strategies, setStrategies] = useState([]);
  const [successPaymentId, setSuccessPaymentId] = useState<string>('');
  const { user } = useUser();

  console.log({
    userId: userId,
    campaignId: campaigns?.campaignId,
    strategyId: strategies?.strategyId,
    successPaymentId: successPaymentId,
  });

  console.log(strategies);

  /*
    0> to get the type of user 
    1> if Agency [
        1> get the lastest campaign details of that agency id 
        2> to get the agency Id need to use orgId 
        3> get the strategy details for that campaign id 
    ]
    2> if Advertiser [
        1> get the latest campaign details of that user id [or get the advertiserId using the user?.id then use that to get the latest campaign details ]
        2> to get this.id user?.id is required 
        3> get the strategy details for that campaign id 
    ]
    3> make changes to the Summery.tsx accordingly 
    4> then send the latest Campaign and Strategy details accordingly to the bill endpoint using handle submission 
*/

  // 0> get the type of user
  const [isAdd, setIsAdd] = useState<string>('');
  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const response = await fetch(`/api/search-user/${id}`, {
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

  /*
1> if Agency [
        1> get the lastest campaign details of that agency id 
        2> to get the agency Id need to use orgId 
        3> get the strategy details for that campaign id 
    ]
    2> if Advertiser [
        1> get the latest campaign details of that user id [or get the advertiserId using the user?.id then use that to get the latest campaign details ]
        2> to get this.id user?.id is required 
        3> get the strategy details for that campaign id 
    ] 
*/
  const [campaignInfo, setCampaignInfo] = useState<string>('');
  console.log(isAdd?.type_of_user);
  //getting the latest campign details
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
      fetchCampaignId(`/api/campaigns/${user?.id}`);
    } else if (isAdd?.type_of_user === 'Agency') {
      fetchCampaignId(`/api/campaigns-agency/${orgId}`);
    }
  }, [isAdd?.type_of_user, user?.id, orgId]);
  console.log(campaignInfo[campaignInfo.length - 1]);

  useEffect(() => {
    if (campaignInfo) {
      setCampaigns(campaignInfo[campaignInfo.length - 1]);
    }
  }, [campaignInfo]);
  console.log(campaigns?.campaignId);

  //getting the latest strategy details
  useEffect(() => {
    if (campaignInfo) {
      const fetchStrategyDetails = async (url: string) => {
        try {
          const { data } = await axios.get(url);
          setStrategies(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchStrategyDetails(`/api/strategy-campaign/${campaigns?.campaignId}`);
    }
  }, [campaigns?.campaignId]);
  console.log(strategies);

  //3> make changes to the Summery.tsx accordingly
  useEffect(() => {
    if (strategies) {
      setAmount(campaigns?.campaignBudget);
    }
  }, [campaigns?.campaignBudget, strategies]);

  //4> then send the latest Campaign and Strategy details accordingly to the bill endpoint using handle submission
  const [successFullpayment, setSuccessFullpeyment] = useState<boolean>(false);
  useEffect(() => {
    if (successPaymentId) {
      const postBillData = async () => {
        const data = await axios.post(
          '/api/bill',
          {
            userId: userId,
            campaignId: campaigns?.campaignId,
            strategyId: strategies?.strategyId,
            successPaymentId: successPaymentId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        await console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx', data);
        const invocationCode = data?.data?.invocation_code;

        if (!invocationCode) {
          throw new Error('Invocation code is missing from the response');
        }
        if (isAdd?.type_of_user === 'Agency') {
          const bidding = await axios.post(
            '/api/add-bidder',
            {
              agencyId: campaignInfo[campaignInfo.length - 1]?.agencyId,
              deliveryTimeSlots: strategies?.deliveryTimeSlots,
              campaignBudget: campaigns?.campaignBudget,
              reviveUrl: invocationCode,
              audiences: strategies?.audiences
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          console.log(bidding);
        } else if (isAdd?.type_of_user === 'Advertiser') {
          const bidding = await axios.post(
            '/api/add-bidder',
            {
              advertiserId: campaignInfo[campaignInfo.length - 1]?.advertiserId,
              deliveryTimeSlots: strategies?.deliveryTimeSlots,
              campaignBudget: campaigns?.campaignBudget,
              reviveUrl: invocationCode,
              audiences: strategies?.audiences
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          console.log(bidding);
        }

        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', data);
        console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', bidding);
      };
      try {
        postBillData();
      } catch (error) {
        console.log(error);
        // I must add custom error handler logic from here
      }
    }
  }, [successPaymentId, isAdd?.type_of_user]);
  //if payment is successful then the confirmation to payment success is received here

  useEffect(() => {
    const paymentConfirmation = async () => {
      const payStData = await axios.get(`/api/bill/${campaigns?.campaignId}`);
      console.log(payStData?.data.paymentSuccess);
      setSuccessFullpeyment(payStData?.data.paymentSuccess);
    };
    paymentConfirmation();
  }, [campaigns?.campaignId]);

  // handlePayment Function
  const handlePayment = async () => {
    try {
      const res = await fetch('/api/payment/order', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          amount,
        }),
      });

      const data = await res.json();
      console.log(data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
    }
  };

  // handlePaymentVerify Function
  const handlePaymentVerify = async (data: PaymentData) => {
    const options = {
      key: 'rzp_test_SZrvteybFNdghB', // Use your Razorpay Test Key
      amount: data.amount,
      currency: data.currency,
      name: 'Rekoon Ads',
      description: 'Test Mode',
      order_id: data.id,
      handler: async (response: RazorpayResponse) => {
        console.log('response', response);
        try {
          const res = await fetch('/api/payment/verify', {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await res.json();

          if (verifyData.message) {
            toast.success(verifyData.message);
            setSuccessPaymentId(response.razorpay_payment_id);
            console.log('Payment ID:', response.razorpay_payment_id);
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      theme: {
        color: '#5f63b8',
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  console.log(campaigns);
  return (
    <Card className="w-full max-w-lg p-4 rounded-lg border border-stroke bg-white shadow-2xl dark:border-strokedark dark:bg-boxdark">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-blue-700">
          <PresentationIcon className="inline-block w-5 h-5 mr-2" />
          Campaign summary
        </CardTitle>
        <CardDescription>
          Review carefully your campaign details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">
              Campaign Name: {campaigns?.campaignName}
            </p>
            <Link to={'/campaign'}>
              <Button variant="ghost" className="p-0 text-sm text-blue-700">
                <ClipboardPenIcon className="inline-block w-4 h-4 mr-1" />
                Edit
              </Button>
            </Link>
          </div>
          <div className="text-right">
            <p className="font-semibold">
              Campaign budget ₹{campaigns?.campaignBudget}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2" />
          <p>
            Start Date: {campaigns?.startDate} and End Date:{' '}
            {campaigns?.endDate}
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold">
            Strategy Name : {strategies?.strategyName}
          </p>
          <div className="flex items-center justify-between">
            <p>Selected Channels goes here</p>
            <Link to={'/strategy'}>
              <Button variant="ghost" className="p-0 text-sm text-blue-700">
                <ClipboardPenIcon className="inline-block w-4 h-4 mr-1" />
                Edit
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <p>Deliverability forecast</p>
            <Badge variant="secondary" className="text-green-700">
              Excellent
            </Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-4 border-t">
        <p className="text-muted-foreground">Total campaign budget</p>
        <p className="text-lg font-semibold">₹{campaigns?.campaignBudget}</p>
      </CardFooter>
      <div className="justify-end">
        {successFullpayment ? (
          <>Paid</>
        ) : (
          <>
            <Button className="text-white" onClick={handlePayment}>
              Pay Now
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
