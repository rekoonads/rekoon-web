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
import { useEffect, useLayoutEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { v4 as uuidv4 } from 'uuid';
import { BarChart, Signal } from 'lucide-react';
import Cookies from 'js-cookie';

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

const LoadingScreen = () => {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    localStorage.removeItem('campaign');
    localStorage.removeItem('strategy');
    setMounted(true);
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 1;
        if (newProgress === 100) {
          clearInterval(timer);
        }
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 text-white">
      <div className="mb-8">
        <Signal className="w-20 h-20 text-blue-400 animate-pulse" />
      </div>
      <h1 className="text-4xl font-bold mb-4">AdTech Analytics</h1>
      <p className="text-xl mb-8">Optimizing your ad performance</p>
      <div className="relative w-64 h-3 bg-blue-900 rounded-full overflow-hidden mb-4">
        <div
          className="absolute top-0 left-0 h-full bg-blue-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex items-center space-x-2 text-blue-300">
        <BarChart className="w-5 h-5 animate-bounce" />
        <span>Processing data</span>
        <span className="w-6 text-right">{progress}%</span>
      </div>
    </div>
  );
};

export default function SummaryComponent() {
  const [amount, setAmount] = useState<number>();
  const { userId, orgId } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [user_data, setUser_data] = useState();
  const [error, setError] = useState(null);
  const [strategies, setStrategies] = useState([]);
  const [button_disabled, setbutton_disabled] = useState<false>();
  const [successPaymentId, setSuccessPaymentId] = useState<string>('');
  const { user } = useUser();
  const domainName = import.meta.env.VITE_DOMAIN;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [durationDate, setDurationDate] = useState<number>(0);

  // useLayoutEffect(()=> {
  //   location.reload()
  // },[])

  console.log('summery userid', userId);
  console.log({
    userId: userId,
    campaignId: campaigns?.campaignId,
    strategyId: strategies?.strategyId,
    successPaymentId: successPaymentId,
  });

  console.log(strategies);

  //_________________________________________________________________________________________________________________________

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

  useEffect(() => {
    if (strategies) {
      setAmount(Number(strategies?.strategyDailyBudget) * durationDate);
    }
  }, [campaigns?.campaignBudget, strategies]);

  //______________________________________________________________________________________________________

  //4> then send the latest Campaign and Strategy details accordingly to the bill endpoint using handle submission
  const [successFullpayment, setSuccessFullpeyment] = useState<boolean>(false);
  const [reviveUrl, setReviveUrl] = useState<any>();
  useEffect(() => {
    if (successPaymentId) {
      const postBillData = async () => {
        setLoading(true);

        const data = await axios.post(
          `${domainName}/api/bill`,
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

        await setLoading(false);

        await console.log('xxxxxxxxxxxxxxxxxxxxxxxxxx', data);
        const invocationCode = data.data.invocation_code;
        console.log(invocationCode);

        if (invocationCode.status == 'error') {
          const errorId = uuidv4();
          await axios.post(`${domainName}/api/save-error`, {
            errorId: errorId,
            userId: userId,
            campaignId: campaigns?.campaignId,
            strategyId: strategies?.strategyId,
            errorMessage: invocationCode.message,
            status: 'Active',
          });
          toast.error(
            `Something went wrong. Please contact support with this ID: ${errorId}`,
          );
        } else {
          if (!invocationCode) {
            throw new Error('Invocation code is missing from the response');
          }
          setReviveUrl(invocationCode?.value);
          if (isAdd?.type_of_user === 'Agency') {
            const bidding = await axios.post(
              `${domainName}/api/add-bidder`,
              {
                agencyId: campaigns?.agencyId,
                deliveryTimeSlots: strategies?.deliveryTimeSlots,
                campaignBudget: campaigns?.campaignBudget,
                reviveUrl: invocationCode.value,
                audiences: strategies?.audiences,
                startDate: campaigns?.startDate,
                endDate: campaigns?.endDate,
                status: 'Active',
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
              `${domainName}/api/add-bidder`,
              {
                advertiserId: campaigns?.advertiserId,
                deliveryTimeSlots: strategies?.deliveryTimeSlots,
                campaignBudget: campaigns?.campaignBudget,
                reviveUrl: invocationCode.value,
                audiences: strategies?.audiences,
                startDate: campaigns?.startDate,
                endDate: campaigns?.endDate,
                status: 'Active',
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
        }
      };
      try {
        postBillData();
      } catch (error) {
        console.log(error);
        // I must add custom error handler logic from here
      }
    }
  }, [successPaymentId, isAdd?.type_of_user, domainName]);

  //if payment is successful then the confirmation to payment success is received here

  useEffect(() => {
    const paymentConfirmation = async () => {
      const payStData = await axios.get(
        `${domainName}/api/bill/${campaigns?.campaignId}`,
      );
      console.log(payStData?.data.paymentSuccess);
      setSuccessFullpeyment(payStData?.data.paymentSuccess);
    };
    paymentConfirmation();
  }, [campaigns?.campaignId]);

  //______________________________________________________________________________________________________
  // handlePayment Function
  const handlePayment = async () => {
    setbutton_disabled(true);
    try {
      let stBal = Number(strategies?.strategyDailyBudget) * durationDate;
      if (user_data && Number(user_data.walletBalance) >= stBal) {
        const res = await fetch(`${domainName}/api/payment/wallet-pay`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            userId: user_data.userId,
            amount,
          }),
        });
        const data = await res.json();
        if (data.message == 'Payment successful') {
          Cookies.remove('campaignId', { path: '/' });
          // Cookies.remove('strategyId', { path: '/' });
          toast.success(data.message);
          setSuccessPaymentId(`wallet-${uuidv4()}`);
          setbutton_disabled(false);
        } else {
          toast.warning(data.message);
        }
      } else {
        const res = await fetch(`${domainName}/api/payment/order`, {
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
        await handlePaymentVerify(data.data);
        setbutton_disabled(false);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
    }
  };

  //______________________________________________________________________________________________________
  // handlePaymentVerify Function
  const handlePaymentVerify = async (data: PaymentData) => {
    const options = {
      key: 'rzp_test_SZrvteybFNdghB', // Use your Razorpay Test Key
      amount: data.amount,
      currency: data.currency,
      name: 'Sweven',
      description: 'Test Mode',
      order_id: data.id,
      handler: async (response: RazorpayResponse) => {
        console.log('response', response);
        try {
          const res = await fetch(`${domainName}/api/payment/verify`, {
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
            Cookies.remove('campaignId', { path: '/' });
            // Cookies.remove('strategyId', { path: '/' });
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

  //navigate to billing page once the revive link is gotten
  useEffect(() => {
    if (reviveUrl) {
      navigate(`/thank-you`);
    }
  }, [reviveUrl]);

  console.log(reviveUrl);

  //__________________________________________________________________________________________________
  //Date Debugging
  let durationTimeDate = Number(
    new Date(campaigns?.endDate) - new Date(campaigns?.startDate),
  );
  let denominator = 1000 * 3600 * 24;
  console.log(durationTimeDate / denominator);

  //getting The Date Difference

  useEffect(() => {
    if (campaigns?.endDate && campaigns?.startDate) {
      let durationTimeDate = Number(
        new Date(campaigns?.endDate) - new Date(campaigns?.startDate),
      );
      let denominator = 1000 * 3600 * 24;
      if (durationTimeDate < 0) {
        setDurationDate(0);
      } else {
        let diff = durationTimeDate / denominator;
        setDurationDate(diff);
      }
    }
  }, [campaigns?.endDate, campaigns?.startDate]);
  console.log(durationDate);

  //__________________________________________________________________________________________________________

  // for Strategy data
  console.log(strategies?.strategyDailyBudget * durationDate);

  console.log(reviveUrl);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return (
      <>
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
            <div className="flex items-center">
              <p>
                Duration:{' '}
                {durationDate === 1
                  ? durationDate + ' ' + 'day'
                  : durationDate + ' ' + 'days'}
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
            <p className="text-lg font-semibold">
              ₹{Number(strategies?.strategyDailyBudget) * durationDate}
            </p>
          </CardFooter>
          <div className="justify-end">
            {successFullpayment ? (
              <>Paid</>
            ) : (
              <>
                <Button
                  disabled={button_disabled}
                  className="text-white"
                  onClick={handlePayment}
                >
                  Pay Now{' '}
                  {user_data
                    ? Number(user_data.walletBalance) >=
                      Number(
                        Number(strategies?.strategyDailyBudget) * durationDate,
                      )
                      ? 'With Wallet'
                      : ''
                    : ''}
                </Button>
              </>
            )}
          </div>
        </Card>
      </>
    );
  }
}
